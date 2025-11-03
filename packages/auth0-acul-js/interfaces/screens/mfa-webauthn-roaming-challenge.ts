import type { CustomOptions, WebAuthnErrorDetails } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, PasskeyRead } from '../models/screen';

/**
 * @interface ScreenMembersOnMfaWebAuthnRoamingChallenge
 * @extends ScreenMembers
 * description Describes the specific properties available on the `screen` object for the
 * 'mfa-webauthn-roaming-challenge' screen.
 */
export interface ScreenMembersOnMfaWebAuthnRoamingChallenge extends ScreenMembers {
  /**
   * Direct access to the `PublicKeyCredentialRequestOptions` (specifically the challenge part)
   * needed for `navigator.credentials.get()`.
   * This is a convenience accessor for `data?.passkey?.public_key`.
   * @type {PasskeyRead['public_key'] | null}
   */
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * Screen-specific data for the mfa-webauthn-roaming-challenge screen
   */
  data: {
    /**
     * The type of WebAuthn authenticator involved, expected to be "roaming" for this screen.
     * @type {string | undefined}
     */
    webAuthnType?: string;
    /**
     * Indicates whether the "Remember this device" checkbox should be displayed.
     * @type {boolean | undefined}
     */
    showRememberDevice?: boolean;
  } | null;
}

/**
 * @interface VerifySecurityKeyOptions
 * @extends CustomOptions
 * description Defines the options for the `verifyWithSecurityKey` method.
 *
 * @property {boolean} [rememberDevice] - Optional. If true, attempts to remember the browser for future MFA challenges.
 * Corresponds to the `rememberBrowser` form field.
 */
export interface VerifySecurityKeyOptions extends CustomOptions {
  rememberDevice?: boolean;
}

/**
 * @interface ReportWebAuthnErrorOptions
 * @extends CustomOptions
 * description Defines the options for the `reportWebAuthnError` method.
 *
 * @property {WebAuthnErrorDetails} error - The error object from the WebAuthn API to be reported.
 */
export interface ReportWebAuthnErrorOptions {
  error: WebAuthnErrorDetails;
}

/**
 * @interface TryAnotherMethodOptions
 * @extends CustomOptions
 * description Defines the options for the `tryAnotherMethod` method.
 * Currently, it only supports `CustomOptions` for extensibility.
 */
export interface TryAnotherMethodOptions extends CustomOptions { }

/**
 * @interface MfaWebAuthnRoamingChallengeMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the MFA WebAuthn Roaming Challenge screen.
 * This screen handles the process of challenging the user with a roaming WebAuthn authenticator.
 */
export interface MfaWebAuthnRoamingChallengeMembers extends BaseMembers {
  /**
   * Screen-specific properties and data, including WebAuthn challenge options.
   * @type {ScreenMembersOnMfaWebAuthnRoamingChallenge}
   */
  screen: ScreenMembersOnMfaWebAuthnRoamingChallenge;

  /**
   * Initiates the WebAuthn challenge by calling `navigator.credentials.get()` with the
   * options provided in `screen.data.publicKeyChallengeOptions`.
   * If successful, it submits the resulting credential to Auth0 with `action: "default"`.
   * If `navigator.credentials.get()` fails with a known WebAuthn API error (like `NotAllowedError`),
   * this method will internally call `reportWebAuthnError` to inform Auth0.
   *
   * @param {VerifySecurityKeyOptions} [options] - Optional parameters for the verification process,
   * such as `rememberDevice` and other custom options.
   * @returns {Promise<void>} A promise that resolves when the verification attempt is submitted.
   *                          It does not directly return data as a successful operation typically results in a redirect.
   * @throws {Error} Throws an error if `screen.data.publicKeyChallengeOptions` is missing,
   *                 if `navigator.credentials.get()` fails with an unexpected error,
   *                 or if the form submission to Auth0 fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnRoamingChallenge
   * try {
   *   await sdk.verify({ rememberDevice: true });
   *   // On success, Auth0 handles redirection.
   * } catch (error) {
   *   console.error("Security key verification failed:", error);
   *   // Check sdk.transaction.errors for server-side validation messages if the page reloads.
   * }
   * ```
   */
  verify(options?: VerifySecurityKeyOptions): Promise<void>;

  /**
   * Reports a specific WebAuthn API error to Auth0.
   * This method should be used if `navigator.credentials.get()` fails in a way that
   * `verify()` doesn't automatically handle, or if the developer wants to explicitly
   * report an error before trying another action.
   * It submits the error details with `action: "showError::{errorDetails}"`.
   *
   * @param {ReportWebAuthnErrorOptions} options - Contains the `error` object with `name` and `message`
   * from the WebAuthn API, and any other custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is submitted.
   * @throws {Error} Throws an error if the form submission fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnRoamingChallenge
   * // And webAuthnError is an error object from a failed navigator.credentials.get() call.
   * try {
   *   await sdk.reportWebAuthnError({
   *     error: { name: webAuthnError.name, message: webAuthnError.message }
   *   });
   * } catch (submitError) {
   *   console.error("Failed to report WebAuthn error:", submitError);
   * }
   * ```
   */
  reportWebAuthnError(options: ReportWebAuthnErrorOptions): Promise<void>;

  /**
   * Allows the user to opt-out of the WebAuthn challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional custom parameters for the request.
   * @returns {Promise<void>} A promise that resolves when the action is submitted.
   * @throws {Error} Throws an error if the form submission fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnRoamingChallenge
   * try {
   *   await sdk.tryAnotherMethod();
   *   // On success, Auth0 handles redirection to MFA selection.
   * } catch (error) {
   *   console.error("Failed to switch MFA method:", error);
   * }
   * ```
   */
  tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void>;
}