import type { CustomOptions, WebAuthnErrorDetails } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers, PasskeyRead } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * @interface ScreenDataOnResetPasswordMfaWebAuthnRoamingChallenge
 * description Specific data available on the `screen.data` object for the
 * `reset-password-mfa-webauthn-roaming-challenge` screen.
 *
 * @property {PasskeyRead} passkey - The WebAuthn public key credential request options (Assertion).
 * This object contains the challenge that needs to be passed to `navigator.credentials.get()`.
 * @property {boolean} [show_remember_device] - Optional. Indicates if the "Remember this device"
 * option should be displayed to the user.
 */
export interface ScreenDataOnResetPasswordMfaWebAuthnRoamingChallenge {
  /**
   * The WebAuthn public key credential request options, specifically the challenge (`publicKey`)
   * to be used with `navigator.credentials.get()`.
   * @type {PasskeyRead}
   */
  passkey: PasskeyRead;
  /**
   * Optional. If true, the UI should offer an option to remember the current device/browser,
   * potentially skipping MFA for a defined period on subsequent logins from the same device.
   * @type {boolean | undefined}
   */
  show_remember_device?: boolean;
}

/**
 * @interface ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge
 * @extends ScreenMembers
 * description Defines the specific properties available on the `screen` object for the
 * `reset-password-mfa-webauthn-roaming-challenge` screen.
 *
 * @property {ScreenDataOnResetPasswordMfaWebAuthnRoamingChallenge | null} data - Screen-specific data,
 * including WebAuthn challenge options and the "show remember device" flag.
 * @property {PasskeyRead['public_key'] | null} publicKey - A convenience accessor for `screen.data.passkey.public_key`.
 * Provides the challenge and related options for `navigator.credentials.get()`.
 * @property {boolean} showRememberDevice - A convenience accessor for `screen.data.show_remember_device`.
 * Indicates if the "Remember this device" option should be displayed. Defaults to `false` if not present.
 */
export interface ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge extends ScreenMembers {
  /**
   * A direct accessor for the `passkey.public_key` data from `screen.data`.
   * This object contains the challenge and other options necessary for the
   * `navigator.credentials.get()` WebAuthn API call.
   * It is `null` if `screen.data.passkey.public_key` is not available.
   * @type {PasskeyRead['public_key'] | null}
   * @public
   */
  publicKey: PasskeyRead['public_key'] | null;

  /**
   * A direct accessor for the `show_remember_device` flag from `screen.data`.
   * Indicates whether the UI should present an option to the user to remember this device/browser
   * to potentially bypass MFA on future logins. Defaults to `false` if not set in `screen.data`.
   * @type {boolean}
   * @public
   */
  showRememberDevice: boolean;
}

/**
 * @interface UseSecurityKeyOptions
 * @extends CustomOptions
 * description Defines the options for the `useSecurityKey` method.
 * This is the primary action where the user attempts to verify with their security key.
 *
 * @property {boolean} [rememberDevice] - Optional. If `true` and `screen.showRememberDevice` is also `true`,
 * the SDK will include `rememberBrowser=true` in the form submission, indicating the user's
 * choice to remember this device.
 */
export interface UseSecurityKeyOptions extends CustomOptions {
  /**
   * Optional. If `true`, and if the screen context (`screen.showRememberDevice`)
   * indicates that remembering the device is an option, this signals the user's
   * intent to remember this browser/device for future authentications.
   * The SDK will submit `rememberBrowser=true` in this case.
   * @type {boolean | undefined}
   */
  rememberDevice?: boolean;
}

/**
 * @interface ShowErrorOptions
 * @extends CustomOptions
 * description Defines the options for the `showError` method.
 * This method is used to report a client-side WebAuthn API error to the Auth0 server.
 *
 * @property {WebAuthnErrorDetails} error - The error object from the WebAuthn API (`navigator.credentials.get()`)
 * containing `name` and `message` of the DOMException.
 * @property {boolean} [rememberDevice] - Optional. If `true` and `screen.showRememberDevice` is also `true`,
 * the SDK will include `rememberBrowser=true` in the form submission.
 */
export interface ShowErrorOptions {
  /**
   * The error object captured from a failed `navigator.credentials.get()` call.
   * This should include at least `name` and `message` properties of the DOMException.
   * @type {WebAuthnErrorDetails}
   * @example { name: "NotAllowedError", message: "The operation was aborted by the user." }
   */
  error: WebAuthnErrorDetails;

  /**
   * Optional. If `true`, and if the screen context (`screen.showRememberDevice`)
   * indicates that remembering the device is an option, this signals the user's
   * intent to remember this browser/device.
   * @type {boolean | undefined}
   */
  rememberDevice?: boolean;
}

/**
 * @interface TryAnotherMethodOptions
 * @extends CustomOptions
 * description Defines the options for the `tryAnotherMethod` method.
 * Allows the user to select a different MFA method.
 *
 * @property {boolean} [rememberDevice] - Optional. If `true` and `screen.showRememberDevice` is also `true`,
 * the SDK will include `rememberBrowser=true` in the form submission.
 */
export interface TryAnotherMethodOptions extends CustomOptions {
  /**
   * Optional. If `true`, and if the screen context (`screen.showRememberDevice`)
   * indicates that remembering the device is an option, this signals the user's
   * intent to remember this browser/device.
   * @type {boolean | undefined}
   */
  rememberDevice?: boolean;
}

/**
 * @interface ResetPasswordMfaWebAuthnRoamingChallengeMembers
 * @extends BaseMembers
 * description Defines all accessible members (properties and methods) for the
 * `reset-password-mfa-webauthn-roaming-challenge` screen.
 *
 * This screen is part of the password reset flow requiring MFA with a WebAuthn roaming authenticator.
 * It allows the user to:
 * 1. Verify their identity using their security key (`useSecurityKey`).
 * 2. Report a client-side error encountered during the WebAuthn process (`showError`).
 * 3. Opt to use a different authentication method (`tryAnotherMethod`).
 */
export interface ResetPasswordMfaWebAuthnRoamingChallengeMembers extends BaseMembers {
  /**
   * Provides access to client-specific information (e.g., client ID, name).
   * @type {ClientMembers}
   */
  client: ClientMembers;

  /**
   * Provides access to organization-specific information, if applicable to the current transaction.
   * Will be `null` or have default values if no organization context is active.
   * @type {OrganizationMembers}
   */
  organization: OrganizationMembers;

  /**
   * Provides access to prompt details (e.g., prompt name, settings).
   * @type {PromptMembers}
   */
  prompt: PromptMembers;

  /**
   * Access to the specific properties and data of the `reset-password-mfa-webauthn-roaming-challenge` screen,
   * including WebAuthn `publicKey` challenge options and the `showRememberDevice` flag.
   * @type {ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge}
   */
  screen: ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge;

  /**
   * Provides access to the current transaction details (e.g., state, errors, locale).
   * @type {TransactionMembers}
   */
  transaction: TransactionMembers;

  /**
   * Initiates the WebAuthn assertion process (security key challenge).
   * This method will internally call `navigator.credentials.get()` using the challenge
   * provided in `screen.publicKey`.
   * On successful interaction with the security key, it submits the resulting
   * `PublicKeyCredential` to Auth0 with `action: "default"`.
   *
   * @param {UseSecurityKeyOptions} [options] - Optional. Parameters for the operation,
   * such as `rememberDevice` (if `screen.showRememberDevice` is true) and other custom options.
   * The `response` field (the WebAuthn credential) is handled internally by the SDK.
   * @returns {Promise<void>} A promise that resolves when the verification attempt is submitted.
   * A successful operation typically results in a redirect by Auth0.
   * @throws {Error} Throws an error if `screen.publicKey` is missing, if `navigator.credentials.get()`
   * fails (e.g., user cancellation, no authenticator found), or if the form submission to Auth0 fails.
   * It's recommended to catch these errors and potentially use `showError()` to report WebAuthn API specific issues.
   */
  useSecurityKey(options?: UseSecurityKeyOptions): Promise<void>;

  /**
   * Reports a client-side WebAuthn API error (from `navigator.credentials.get()`) to Auth0.
   * This method should be used when `useSecurityKey()` (or a manual `navigator.credentials.get()` call)
   * fails due to a browser-side WebAuthn issue (e.g., `NotAllowedError` if the user cancels the prompt,
   * `NotFoundError` if no matching authenticator is found, or a timeout).
   * It submits the error details with `action: "showError::{errorDetailsJsonString}"` and an empty `response`.
   *
   * @param {ShowErrorOptions} options - Contains the `error` object (with `name` and `message`
   * from the WebAuthn API DOMException), an optional `rememberDevice` flag, and any other custom options.
   * @returns {Promise<void>} A promise that resolves when the error report is submitted.
   * Auth0 may re-render the page with error information or redirect.
   * @throws {Error} Throws an error if the form submission fails (e.g., network error, invalid state).
   */
  showError(options: ShowErrorOptions): Promise<void>;

  /**
   * Allows the user to opt-out of the WebAuthn roaming challenge and select a different MFA method.
   * This action submits `action: "pick-authenticator"` to Auth0, which should navigate
   * the user to an MFA factor selection screen.
   *
   * @param {TryAnotherMethodOptions} [options] - Optional. Parameters for the operation,
   * such as `rememberDevice` (if `screen.showRememberDevice` is true) and other custom options.
   * @returns {Promise<void>} A promise that resolves when the 'pick-authenticator' action is submitted.
   * @throws {Error} Throws an error if the form submission fails.
   */
  tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void>;
}