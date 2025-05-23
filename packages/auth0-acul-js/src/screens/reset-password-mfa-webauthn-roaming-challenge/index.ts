import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { getPasskeyCredentials } from '../../utils/passkeys';

import { ScreenOverride } from './screen-override';

import type {CustomOptions, WebAuthnErrorDetails } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaWebAuthnRoamingChallengeMembers,
  ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge as ScreenOptions,
  UseSecurityKeyOptions,
  ShowErrorOptions,
  TryAnotherMethodOptions,
} from '../../../interfaces/screens/reset-password-mfa-webauthn-roaming-challenge';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';
import type { PasskeyCredentialResponse } from '../../../interfaces/utils/passkeys';

/**
 * @class ResetPasswordMfaWebAuthnRoamingChallenge
 * @extends BaseContext
 * implements ResetPasswordMfaWebAuthnRoamingChallengeMembers
 * description Manages interactions for the 'reset-password-mfa-webauthn-roaming-challenge' screen.
 * This screen prompts the user to use their WebAuthn roaming authenticator (e.g., a security key)
 * as a second factor during the password reset process. It handles:
 * - Initiating the security key challenge via the WebAuthn API.
 * - Submitting the successful credential assertion to Auth0.
 * - Reporting client-side WebAuthn API errors to Auth0.
 * - Allowing the user to try a different MFA method.
 */
export default class ResetPasswordMfaWebAuthnRoamingChallenge
  extends BaseContext
  implements ResetPasswordMfaWebAuthnRoamingChallengeMembers {
  /**
   * The unique identifier for this screen, used for internal SDK logic and telemetry.
   * @type {string}
   * static
   * @readonly
   */
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_ROAMING_CHALLENGE;

  /**
   * Holds the specific screen data and properties for this screen,
   
   * (for the WebAuthn challenge) and `showRememberDevice`.
   * @type {ScreenOptions}
   * @public
   */
  public screen: ScreenOptions;

  /**
   * Initializes a new instance of the `ResetPasswordMfaWebAuthnRoamingChallenge` class.
   * It retrieves the necessary context (screen, transaction, etc.) from the global
   * @throws {Error} If the Universal Login Context is not available or if the screen name
   * in the context does not match `ResetPasswordMfaWebAuthnRoamingChallenge.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Initiates the WebAuthn security key challenge.
   * This method internally calls `navigator.credentials.get()` using the challenge
   * options provided in `this.screen.publicKey`.
   * If the user successfully authenticates with their security key, the resulting
   * `PublicKeyCredential` is stringified and submitted to Auth0 with `action: "default"`.
   *
   * @param {UseSecurityKeyOptions} [options] - Optional parameters for the operation.
   * This can include `rememberDevice` (if `this.screen.showRememberDevice` is true) and
   * any other custom key-value pairs to be sent in the form submission.
   * The `response` field (the WebAuthn credential) is handled internally by this method.
   * @returns {Promise<void>} A promise that resolves when the verification attempt is submitted.
   * A successful operation usually results in Auth0 redirecting the user.
   * @throws {Error} Throws an error if `this.screen.publicKey` is missing (indicating missing challenge options),
   * if `getPasskeyCredentials` (which wraps `navigator.credentials.get()`) fails (e.g., user cancellation,
   * no authenticator found, hardware error), or if the final form submission to Auth0 fails.
   * It is crucial to catch errors from this method. WebAuthn API errors (like `NotAllowedError`)
   * should be reported using {@link showError}.
   *
   * @example
   * ```typescript
   * // In your UI component for the reset-password-mfa-webauthn-roaming-challenge screen:
   * const sdk = new ResetPasswordMfaWebAuthnRoamingChallenge();
   *
   * async function handleSecurityKeyAuth() {
   *   try {
   *     const userWantsToRemember = document.getElementById('remember-device-checkbox')?.checked || false;
   *     await sdk.useSecurityKey({ rememberDevice: sdk.screen.showRememberDevice && userWantsToRemember });
   *     // On success, Auth0 typically handles redirection.
   *   } catch (err) {
   *     console.error("Security key authentication failed:", err);
   *     // If it's a WebAuthn API error, report it to Auth0
   *     if (err.name && err.message) { // Basic check for DOMException-like error
   *       try {
   *         await sdk.showError({ error: { name: err.name, message: err.message } });
   *       } catch (reportError) {
   *         console.error("Failed to report WebAuthn error:", reportError);
   *       }
   *     }
   *     // Update UI to inform the user, e.g., "Security key verification failed. Please try again."
   *     // Also check `sdk.transaction.errors` if the page might have reloaded with an error message from the server.
   *   }
   * }
   * ```
   */
  public async useSecurityKey(options?: UseSecurityKeyOptions): Promise<void> {
    const publicKeyOpts = this.screen.publicKey;
    
    if (!publicKeyOpts) {
      throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    }

    // `getPasskeyCredentials` calls `navigator.credentials.get()` and processes the response.
    // It will throw if `navigator.credentials.get()` fails or returns null.

    const credential = (await getPasskeyCredentials(publicKeyOpts)) as PasskeyCredentialResponse | null;

    if (!credential) {
      // This case should ideally be caught by getPasskeyCredentials throwing an error
      throw new Error(Errors.PASSKEY_CREDENTIALS_UNAVAILABLE);
    }

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaWebAuthnRoamingChallenge.screenIdentifier, 'useSecurityKey'],
      route: '/u/mfa-webauthn-challenge', // As per OpenAPI spec
    };

    const { rememberDevice, ...customSubmissionOptions } = options || {};
    const payloadToSubmit: CustomOptions = {
      ...customSubmissionOptions,
      action: FormActions.DEFAULT,
      response: JSON.stringify(credential),
    };

    if (this.screen.showRememberDevice && rememberDevice) {
      payloadToSubmit.rememberBrowser = true;
    }

    await new FormHandler(formOptions).submitData(payloadToSubmit);
  }

  /**
   * Reports a client-side WebAuthn API error (from `navigator.credentials.get()`) to Auth0.
   * This method is intended to be called when {@link useSecurityKey} (or a direct call to
   * `navigator.credentials.get()`) fails due to a standard WebAuthn API error
   * (e.g., `NotAllowedError` if the user cancels, `NotFoundError`, `SecurityError`, timeout).
   * It submits the error details with `action: "showError::{errorDetailsJsonString}"` and an empty `response`.
   *
   * @param {ShowErrorOptions} options - Contains the `error` object (with `name` and `message`
   * from the WebAuthn API DOMException), an optional `rememberDevice` flag, and any other custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is successfully submitted.
   * Auth0 may re-render the page with specific error messages in `this.transaction.errors` or redirect.
   * @throws {Error} Throws an error if the form submission itself fails (e.g., network error, invalid state).
   *
   * @example
   * ```typescript
   * // In your UI, after catching an error from `sdk.useSecurityKey()` or `navigator.credentials.get()`:
   * if (webAuthnError instanceof DOMException) {
   *   await sdk.showError({
   *     error: { name: webAuthnError.name, message: webAuthnError.message },
   *     rememberDevice: userWantsToRemember // if applicable
   *   });
   * }
   * ```
   */
  public async showError(options: ShowErrorOptions): Promise<void> {
    const { error, rememberDevice, ...customPayload } = options;

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaWebAuthnRoamingChallenge.screenIdentifier, 'showError'],
      route: '/u/mfa-webauthn-challenge', // As per OpenAPI spec
    };

    // Sanitize errorDetails for payload, including only defined properties
    const errorDetailsForPayload: Partial<WebAuthnErrorDetails> = { name: error.name, message: error.message };
    if (error.code !== undefined) errorDetailsForPayload.code = error.code;
    // Add other common DOMException properties if needed and part of WebAuthnErrorDetails
    // if (error.type !== undefined) errorDetailsForPayload.type = error.type; // Example if 'type' was added

    const errorDetailsString = JSON.stringify(errorDetailsForPayload);

    const payloadToSubmit: { action: string; response: string; rememberBrowser?: boolean;[key: string]: unknown } = {
      ...customPayload,
      action: `${FormActions.SHOW_ERROR_ACTION_PREFIX}${errorDetailsString}`,
      response: '', // Response is empty for showError actions
    };

    if (this.screen.showRememberDevice && rememberDevice) {
      payloadToSubmit.rememberBrowser = true;
    }

    await new FormHandler(formOptions).submitData(payloadToSubmit);
  }

  /**
   * Allows the user to opt-out of the WebAuthn roaming authenticator challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional. Parameters for the operation,
   * such as `rememberDevice` (if `this.screen.showRememberDevice` is true) and other custom options.
   * @returns {Promise<void>} A promise that resolves when the 'pick-authenticator' action is submitted.
   * @throws {Error} Throws an error if the form submission fails (e.g., network error, invalid state).
   *
   * @example
   * ```typescript
   * // When the user clicks a "Try Another Way" button:
   * await sdk.tryAnotherMethod({ rememberDevice: userWantsToRemember });
   * // Auth0 handles redirection to the MFA selection screen.
   * ```
   */
  public async tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaWebAuthnRoamingChallenge.screenIdentifier, 'tryAnotherMethod'],
      route: '/u/mfa-webauthn-challenge', // As per OpenAPI spec
    };

    const { rememberDevice, ...customPayload } = options || {};
    const payloadToSubmit: { action: string; rememberBrowser?: boolean;[key: string]: unknown } = {
      ...customPayload,
      action: FormActions.PICK_AUTHENTICATOR,
    };

    if (this.screen.showRememberDevice && rememberDevice) {
      payloadToSubmit.rememberBrowser = true;
    }

    await new FormHandler(formOptions).submitData(payloadToSubmit);
  }
}

// Export all necessary types and members for this screen
export {
  ResetPasswordMfaWebAuthnRoamingChallengeMembers,
  ScreenOptions as ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge,
  UseSecurityKeyOptions,
  ShowErrorOptions,
  TryAnotherMethodOptions,
  WebAuthnErrorDetails,
  PasskeyCredentialResponse,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';