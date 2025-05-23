import type { CustomOptions, WebAuthnErrorDetails } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, PasskeyRead } from '../models/screen';

/**
 * @interface ScreenMembersOnMfaWebAuthnPlatformChallenge
 * @extends ScreenMembers
 * description Describes the specific properties available on the `screen` object for the
 * 'mfa-webauthn-platform-challenge' screen.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {boolean} [data.show_remember_device] - Optional flag indicating whether to show the "Remember this device" option.
 * @property {PasskeyRead['public_key'] | null} publicKey - The public key credential request options (specifically the challenge)
 * needed to call `navigator.credentials.get()`. This is derived from `universal_login_context.screen.data.passkey.public_key`.
 */
export interface ScreenMembersOnMfaWebAuthnPlatformChallenge extends ScreenMembers {
  /**
   * Direct access to the `PublicKeyCredentialRequestOptions` (specifically the challenge part)
   * needed for `navigator.credentials.get()`.
   * This is a convenience accessor for `data?.passkey?.public_key`.
   * @type {PasskeyRead['public_key'] | null}
   */
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * Indicates whether the "Remember this device" checkbox should be displayed.
   * @type {boolean}
   */
  showRememberDevice: boolean;
}

/**
 * @interface VerifyPlatformAuthenticatorOptions
 * @extends CustomOptions
 * description Defines the options for the `verify` method.
 *
 * @property {boolean} [rememberDevice] - Optional. If true, attempts to remember the browser for future MFA challenges.
 * Corresponds to the `rememberBrowser` form field. This is only applicable if `screen.showRememberDevice` is true.
 */
export interface VerifyPlatformAuthenticatorOptions extends CustomOptions {
  /**
   * Optional. If true and `screen.showRememberDevice` is true, this indicates the user
   * has chosen to remember this device, typically for 30 days, to bypass MFA on subsequent logins.
   * @type {boolean}
   */
  rememberDevice?: boolean;
}

/**
 * @interface ReportBrowserErrorOptions
 * @extends CustomOptions
 * description Defines the options for the `reportBrowserError` method.
 *
 * @property {WebAuthnErrorDetails} error - The error object from the WebAuthn API (`navigator.credentials.get()`) to be reported.
 */
export interface ReportBrowserErrorOptions {
  /**
   * The error object received from the WebAuthn API (`navigator.credentials.get()`) failure.
   * This should include at least `name` and `message` properties of the DOMException.
   * @type {WebAuthnErrorDetails}
   */
  error: WebAuthnErrorDetails;
}

/**
 * @interface TryAnotherMethodOptions
 * @extends CustomOptions
 * description Defines the options for the `tryAnotherMethod` method.
 * Currently, it only supports `CustomOptions` for extensibility if any custom parameters
 * need to be sent with the 'pick-authenticator' action.
 */
export interface TryAnotherMethodOptions extends CustomOptions {}

/**
 * @interface MfaWebAuthnPlatformChallengeMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the MFA WebAuthn Platform Challenge screen.
 * This screen handles the process of challenging the user with a platform authenticator.
 */
export interface MfaWebAuthnPlatformChallengeMembers extends BaseMembers {
  /**
   * Screen-specific properties and data, including WebAuthn challenge options and remember device preference.
   * @type {ScreenMembersOnMfaWebAuthnPlatformChallenge}
   */
  screen: ScreenMembersOnMfaWebAuthnPlatformChallenge;

  /**
   * Initiates the WebAuthn platform authenticator challenge.
   * This method internally calls `navigator.credentials.get()` using the challenge options
   * provided in `screen.publicKey`.
   * If successful, it submits the resulting credential to Auth0 with `action: "default"`.
   *
   * If `navigator.credentials.get()` fails (e.g., user cancellation, timeout, or other WebAuthn API errors),
   * it's recommended to call `reportBrowserError` with the error details.
   *
   * @param {VerifyPlatformAuthenticatorOptions} [options] - Optional parameters for the verification process,
   * such as `rememberDevice` (if `screen.showRememberDevice` is true) and other custom options.
   * @returns {Promise<void>} A promise that resolves when the verification attempt is submitted.
   *                          A successful operation typically results in a redirect.
   * @throws {Error} Throws an error if `screen.publicKey` is missing,
   *                 if `navigator.credentials.get()` fails with an unexpected error not handled by `getPasskeyCredentials`,
   *                 or if the form submission to Auth0 fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformChallenge
   * try {
   *   const remember = sdk.screen.showRememberDevice && userCheckedRememberDeviceBox;
   *   await sdk.verify({ rememberDevice: remember });
   *   // On success, Auth0 handles redirection.
   * } catch (error) {
   *   console.error("Platform authenticator verification failed:", error);
   *   // If it's a WebAuthn API error, report it
   *   if (error.name && error.message) { // Basic check for DOMException like error
   *     await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
   *   }
   *   // Check sdk.transaction.errors for server-side validation messages if the page reloads.
   * }
   * ```
   */
  verify(options?: VerifyPlatformAuthenticatorOptions): Promise<void>;

  /**
   * Reports a specific WebAuthn API error (from `navigator.credentials.get()`) to Auth0.
   * This method should be used when `verify()` (or a manual `navigator.credentials.get()` call) fails due to
   * a browser-side WebAuthn issue (e.g., user cancellation `NotAllowedError`, timeout).
   * It submits the error details with `action: "showError::{errorDetailsJsonString}"` and an empty `response`.
   *
   * @param {ReportBrowserErrorOptions} options - Contains the `error` object (with `name` and `message`
   * from the WebAuthn API DOMException) and any other custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is submitted.
   * @throws {Error} Throws an error if the form submission fails (e.g., network error, invalid state).
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformChallenge
   * // And webAuthnDomException is an error object from a failed navigator.credentials.get() call.
   * try {
   *   await sdk.reportBrowserError({
   *     error: { name: webAuthnDomException.name, message: webAuthnDomException.message }
   *   });
   *   // Auth0 will process this error and may re-render the page or redirect.
   * } catch (submitError) {
   *   console.error("Failed to report WebAuthn browser error:", submitError);
   * }
   * ```
   */
  reportBrowserError(options: ReportBrowserErrorOptions): Promise<void>;

  /**
   * Allows the user to opt-out of the WebAuthn platform challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves when the 'pick-authenticator' action is submitted.
   * @throws {Error} Throws an error if the form submission fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformChallenge
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