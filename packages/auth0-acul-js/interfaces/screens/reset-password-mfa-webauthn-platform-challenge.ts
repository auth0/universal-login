// packages/auth0-acul-js/interfaces/screens/reset-password-mfa-webauthn-platform-challenge.ts
import type { CustomOptions, WebAuthnErrorDetails } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, PasskeyRead } from '../models/screen';

/**
 * @interface ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the
 * 'reset-password-mfa-webauthn-platform-challenge' screen. This screen is part of the password reset flow
 * when MFA with a WebAuthn platform authenticator (like Touch ID, Windows Hello) is required.
 *
 * @property {object | null} data - Screen-specific data.
 * @property {boolean} [data.show_remember_device] - Optional flag indicating whether to show the "Remember this device"
 *                                                  checkbox to the user. If true, the user can choose to
 *                                                  remember this browser for a certain period, potentially
 *                                                  skipping MFA for subsequent logins from the same device.
 * @property {PasskeyRead | null} data.passkey - The passkey information containing the public key credential
 *                                               request options (specifically the challenge) needed to call
 *                                               `navigator.credentials.get()`. This structure aligns with
 *                                               the WebAuthn API requirements for asserting an existing credential.
 *
 * @property {PasskeyRead['public_key'] | null} publicKey - A convenience accessor for `data.passkey.public_key`.
 *                                                          Provides the challenge and other parameters for the
 *                                                          WebAuthn `navigator.credentials.get()` API call.
 * @property {boolean} showRememberDevice - A convenience accessor for `data.show_remember_device`.
 *                                          Indicates if the "Remember this device" option should be displayed.
 *                                          Defaults to `false` if not present in the context.
 */
export interface ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge extends ScreenMembers {
  /**
   * Convenience getter for the public key credential request options (challenge) needed for WebAuthn.
   * This is derived from `screen.data.passkey.public_key`.
   * If `screen.data.passkey` or `screen.data.passkey.public_key` is not available, this will be `null`.
   * @type {PasskeyRead['public_key'] | null}
   */
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * Convenience getter for whether the "Remember this device" option should be shown.
   * Derived from `screen.data.show_remember_device`. Defaults to `false` if not specified.
   * @type {boolean}
   */
  showRememberDevice: boolean;
}

/**
 * @interface ContinueWithPasskeyOptions
 * @extends CustomOptions
 * description Defines the options for the `continueWithPasskey` method.
 * This operation initiates the WebAuthn platform authenticator verification process.
 * The SDK will internally use `this.screen.publicKey` to call `navigator.credentials.get()`.
 *
 * @property {boolean} [rememberDevice] - Optional. If `true` and `screen.showRememberDevice` is also `true`,
 *                                        this indicates the user has opted to remember the current browser,
 *                                        potentially skipping MFA for a period. Corresponds to the `rememberBrowser` form field.
 */
export interface ContinueWithPasskeyOptions extends CustomOptions {
  /**
   * Optional. If true, and if `screen.showRememberDevice` is also true,
   * this signals the server to remember this browser for MFA for a defined period.
   * @type {boolean | undefined}
   */
  rememberDevice?: boolean;
}

/**
 * @interface ReportBrowserErrorOptions
 * @extends CustomOptions
 * description Defines the options for the `reportBrowserError` method.
 * This is used to inform Auth0 about a client-side error that occurred during
 * the WebAuthn `navigator.credentials.get()` API call (e.g., user cancellation, timeout).
 *
 * @property {WebAuthnErrorDetails} error - The error object from the WebAuthn API (`navigator.credentials.get()`)
 *                                          to be reported. Must include `name` and `message`.
 */
export interface ReportBrowserErrorOptions {
  /**
   * The error object from the WebAuthn API. This typically is a `DOMException`.
   * The SDK expects an object with at least `name` and `message` properties.
   * @type {WebAuthnErrorDetails}
   * @example { name: "NotAllowedError", message: "The operation was cancelled by the user." }
   */
  error: WebAuthnErrorDetails;
}

/**
 * @interface TryAnotherMethodOptions
 * @extends CustomOptions
 * description Defines the options for the `tryAnotherMethod` method.
 * This allows the user to opt-out of the current WebAuthn platform challenge
 * and select a different MFA method for password reset verification.
 */
export interface TryAnotherMethodOptions extends CustomOptions {
  // Currently, no specific properties beyond CustomOptions are defined for this action.
  // This interface is here for future extensibility.
}

/**
 * @interface ResetPasswordMfaWebAuthnPlatformChallengeMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the Reset Password MFA WebAuthn Platform Challenge screen.
 * This screen is part of the password reset flow, where the user must verify their identity using a platform
 * authenticator (e.g., Touch ID, Windows Hello) as a second factor.
 *
 * The `universal_login_context` for this screen (`window.universal_login_context`) will contain:
 * - `client`: Information about the Auth0 application.
 * - `organization` (optional): Details if the operation is for a specific organization.
 * - `prompt`: Context of the current authentication prompt (e.g., 'reset-password').
 * - `screen`: UI texts and screen-specific data, including `screen.data.passkey` (for WebAuthn challenge)
 *             and `screen.data.show_remember_device`.
 * - `transaction`: Details of the ongoing transaction, including state and any errors from previous attempts.
 * - `user`: Information about the user undergoing password reset.
 */
export interface ResetPasswordMfaWebAuthnPlatformChallengeMembers extends BaseMembers {
  /**
   * Access to the specific properties and data of the 'reset-password-mfa-webauthn-platform-challenge' screen.
   * @type {ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge}
   */
  screen: ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge;

  /**
   * Initiates the WebAuthn platform authenticator challenge by calling `navigator.credentials.get()`
   * using the challenge options provided in `screen.publicKey`.
   * If successful, it submits the resulting credential assertion to Auth0 with `action: "default"`.
   *
   * @param {ContinueWithPasskeyOptions} [options] - Optional parameters for the verification process,
   * such as `rememberDevice` (if `screen.showRememberDevice` is true) and other custom options.
   * @returns {Promise<void>} A promise that resolves when the verification attempt is submitted.
   *                          A successful operation typically results in a redirect.
   * @throws {Error} Throws an error if `screen.publicKey` is missing,
   *                 if `navigator.credentials.get()` fails (e.g., user cancellation `NotAllowedError`),
   *                 or if the form submission to Auth0 fails. If `navigator.credentials.get()` fails
   *                 with a `DOMException`, it's recommended to catch that error and call `reportBrowserError`.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of ResetPasswordMfaWebAuthnPlatformChallenge
   * try {
   *   await sdk.continueWithPasskey({
   *     rememberDevice: true // if user checked the box and sdk.screen.showRememberDevice is true
   *   });
   *   // On success, Auth0 handles redirection.
   * } catch (error) {
   *   console.error("Platform authenticator verification failed:", error);
   *   // If it's a WebAuthn API error (DOMException), report it
   *   if (error instanceof DOMException && error.name && error.message) {
   *     await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
   *   }
   *   // Check sdk.transaction.errors for server-side validation messages if the page reloads.
   * }
   * ```
   */
  continueWithPasskey(options?: ContinueWithPasskeyOptions): Promise<void>;

  /**
   * Reports a browser-side error that occurred during the `navigator.credentials.get()` API call.
   * This is used to inform Auth0 about issues like user cancellation, timeout, or unsupported hardware.
   * It submits the error details with `action: "showError::{errorDetailsJsonString}"`.
   *
   * @param {ReportBrowserErrorOptions} options - Contains the `error` object (with `name` and `message`
   *                                              from the WebAuthn API DOMException) and any custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is submitted.
   * @throws {Error} If the form submission fails (e.g., network error).
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of ResetPasswordMfaWebAuthnPlatformChallenge
   * // and 'webAuthnError' is a DOMException from a failed navigator.credentials.get() call.
   * try {
   *   await sdk.reportBrowserError({
   *     error: { name: webAuthnError.name, message: webAuthnError.message }
   *   });
   *   // Auth0 may re-render the page or redirect based on the error.
   * } catch (submitError) {
   *   console.error("Failed to report WebAuthn browser error:", submitError);
   * }
   * ```
   */
  reportBrowserError(options: ReportBrowserErrorOptions): Promise<void>;

  /**
   * Allows the user to opt-out of the WebAuthn platform challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen for the password reset flow.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional. Any custom parameters to be sent with the request.
   * @returns {Promise<void>} A promise that resolves when the 'pick-authenticator' action is submitted.
   * @throws {Error} If the form submission fails.
   *
   * @example
   * ```typescript
   * // Assuming 'sdk' is an instance of ResetPasswordMfaWebAuthnPlatformChallenge
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