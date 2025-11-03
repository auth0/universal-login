import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { getPasskeyCredentials } from '../../utils/passkeys'; // This utility can be used for `navigator.credentials.get()`

import { ScreenOverride } from './screen-override';

import type { CustomOptions, WebAuthnErrorDetails } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaWebAuthnPlatformChallengeMembers,
  ScreenMembersOnMfaWebAuthnPlatformChallenge as ScreenOptions,
  VerifyPlatformAuthenticatorOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions,
} from '../../../interfaces/screens/mfa-webauthn-platform-challenge';
import type { FormOptions as SDKFormOptions } from '../../../interfaces/utils/form-handler';
import type { PasskeyCredentialResponse } from '../../../interfaces/utils/passkeys';

/**
 * @class MfaWebAuthnPlatformChallenge
 * @extends BaseContext
 * implements MfaWebAuthnPlatformChallengeMembers
 * description Manages interactions for the MFA WebAuthn Platform Challenge screen.
 * This screen prompts the user to use their device's platform authenticator.
 * It handles the WebAuthn `navigator.credentials.get()` API call, submission of the
 * resulting credential, reporting browser-side WebAuthn errors, and an option
 * to try a different MFA method.
 */
export default class MfaWebAuthnPlatformChallenge extends BaseContext implements MfaWebAuthnPlatformChallengeMembers {
  /**
   * static
   * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-platform-challenge' screen.
   * Used by `BaseContext` to ensure the correct screen class is instantiated.
   */
  static screenIdentifier: string = ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE;

  /**
   * @property {ScreenOptions} screen - Holds the specific screen data and properties for this screen,
   * processed by `ScreenOverride`. This includes `publicKey` for the WebAuthn API call
   * and `showRememberDevice`.
   */
  public screen: ScreenOptions;

  /**
   * Initializes a new instance of the `MfaWebAuthnPlatformChallenge` class.
   * It retrieves the necessary context (screen, transaction, etc.) from the global `universal_login_context`.
   * @throws {Error} If the Universal Login Context is not available or if the screen name
   * in the context does not match `MfaWebAuthnPlatformChallenge.screenIdentifier`.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Initiates the WebAuthn platform authenticator challenge.
   * Internally, this method retrieves the challenge options from `this.screen.publicKey`,
   * calls `navigator.credentials.get()` (via the `getPasskeyCredentials` utility),
   * and then submits the resulting credential assertion to the Auth0 server.
   *
   * @param {VerifyPlatformAuthenticatorOptions} [options] - Optional parameters for the verification.
   * This can include `rememberDevice` if `this.screen.data.showRememberDevice` is true,
   * and any other custom key-value pairs to be sent in the form submission.
   * @returns {Promise<void>} A promise that resolves when the credential submission is initiated.
   * A successful operation typically results in a server-side redirect.
   * @throws {Error} Throws an error if `this.screen.publicKey` is not available (indicating missing challenge options),
   * if `getPasskeyCredentials` (and thus `navigator.credentials.get()`) fails (e.g., user cancellation,
   * no authenticator found, hardware error), or if the final form submission to Auth0 fails.
   * It's crucial to catch errors from this method. WebAuthn API errors (like `NotAllowedError`)
   * should ideally be reported using `this.reportBrowserError()`.
   */
  async verify(options?: VerifyPlatformAuthenticatorOptions): Promise<void> {
    const publicKeyOpts = this.screen.publicKey;
    if (!publicKeyOpts) {
      throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    }

    // `getPasskeyCredentials` calls `navigator.credentials.get()` and processes the response.
    // It will throw if `navigator.credentials.get()` fails or returns null.
    const credential = await getPasskeyCredentials(publicKeyOpts);

    // If credential is null (though getPasskeyCredentials should throw if it fails to get one),
    // this is an unexpected state.
    if (!credential) {
      throw new Error(Errors.PASSKEY_CREDENTIALS_UNAVAILABLE); // Or a more specific error
    }

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnPlatformChallenge.screenIdentifier, 'verify']
    };

    const { rememberDevice, ...customSubmissionOptions } = options || {};
    const payloadToSubmit: CustomOptions & { action: string; response: string; rememberBrowser?: boolean } = {
      ...customSubmissionOptions,
      action: FormActions.DEFAULT,
      response: JSON.stringify(credential), // The PublicKeyCredential response as a JSON string
    };

    if (this.screen.data?.showRememberDevice && rememberDevice) {
      payloadToSubmit.rememberBrowser = true;
    }

    await new FormHandler(formOptions).submitData(payloadToSubmit);
  }

  /**
   * Reports a browser-side error encountered during the WebAuthn `navigator.credentials.get()` operation.
   * This method should be called when `verify()` fails due to a WebAuthn API error (e.g., user cancellation).
   * It sends the error details to the server with a specific action format.
   *
   * @param {ReportBrowserErrorOptions} options - Contains the `error` object (with `name` and `message`
   * properties from the browser's WebAuthn API DOMException) and any other custom options.
   * The `error` object will be JSON stringified and embedded in the `action` parameter.
   * @returns {Promise<void>} A promise that resolves when the error report is successfully submitted.
   * @throws {Error} Throws an error if the form submission fails (e.g., network issue, invalid state).
   */
  async reportBrowserError(options: ReportBrowserErrorOptions): Promise<void> {
    const { error: errorDetails, ...customPayload } = options;

    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnPlatformChallenge.screenIdentifier, 'reportBrowserError']
    };

    // Sanitize errorDetails to include only known and safe properties if necessary,
    // though WebAuthnErrorDetails interface already limits it to name, message, and custom string/number/boolean.
    const errorDetailsString = JSON.stringify(errorDetails);

    await new FormHandler(formOptions).submitData({
      ...customPayload, // Spread any other custom key-value pairs from the 'options' object
      action: `${FormActions.SHOW_ERROR_ACTION_PREFIX}${errorDetailsString}`,
      response: '', // As per OpenAPI examples for showError actions
    });
  }

  /**
   * Allows the user to opt-out of the WebAuthn platform challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional. Any custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves when the 'pick-authenticator' action is submitted.
   * @throws {Error} Throws an error if the form submission fails (e.g., network error, invalid state).
   */
  async tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void> {
    const formOptions: SDKFormOptions = {
      state: this.transaction.state,
      telemetry: [MfaWebAuthnPlatformChallenge.screenIdentifier, 'tryAnotherMethod']
    };

    await new FormHandler(formOptions).submitData({
      ...(options || {}), // Spread all properties from the options object
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

// Export the primary class and its relevant member and options interfaces.
export {
  MfaWebAuthnPlatformChallengeMembers,
  ScreenOptions as ScreenMembersOnMfaWebAuthnPlatformChallenge,
  VerifyPlatformAuthenticatorOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions,
  WebAuthnErrorDetails, // Re-export for convenience
  PasskeyCredentialResponse, // Re-export for understanding the structure of `verify`'s internal result
};

// Re-export common interfaces and base properties for convenience with this screen.
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';