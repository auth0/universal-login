import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

/**
 * @interface ContinueWithCodeOptions
 * description Options for the `continueWithCode` method on the Login Email Verification screen.
 * This operation is used when the user submits the verification code they received via email
 * to proceed with the authentication flow.
 * @extends {CustomOptions}
 */
export interface ContinueWithCodeOptions extends CustomOptions {
  /**
   * The verification code sent to the user's email. This is typically a short numeric
   * or alphanumeric string that the user must enter into the form.
   * @type {string}
   * @example "123456"
   * @example "ABCXYZ"
   */
  code: string;
}

/**
 * @interface ResendCodeOptions
 * description Options for the `resendCode` method on the Login Email Verification screen.
 * This operation is used when the user requests a new verification code to be sent to their email,
 * for instance, if they did not receive the initial code or if it has expired.
 * @extends {CustomOptions}
 */
export interface ResendCodeOptions extends CustomOptions {}

/**
 * @interface LoginEmailVerificationMembers
 * description Defines the members (properties and methods) available for interacting with the Login Email Verification screen.
 * This screen is a crucial part of email verification processes, typically during login, where a user must prove
 * ownership of an email address by providing a one-time code. The SDK facilitates submitting this code
 * or requesting a new one.
 *
 * The `universal_login_context` for this screen (`window.universal_login_context`) will contain:
 * - `client`: Information about the Auth0 application.
 * - `organization` (optional): Details if the authentication is for a specific organization.
 * - `prompt`: Context of the current authentication prompt (e.g., 'login').
 * - `screen`: UI texts and general screen information. No screen-specific `data` fields are uniquely defined for `login-email-verification` beyond standard ones.
 * - `transaction`: Details of the ongoing transaction, including state and any errors from previous attempts (e.g., "invalid-code").
 *
 * @extends {BaseMembers}
 */
export interface LoginEmailVerificationMembers extends BaseMembers {
  /**
   * Submits the email verification code entered by the user.
   * This action corresponds to the user entering the code they received via email and
   * clicking a "Continue" or "Verify" button. The SDK will then POST this code
   * to the Auth0 `/u/login-email-verification` endpoint.
   *
   * If the code is valid, Auth0 will typically redirect the user to the next step in the
   * authentication flow. If the code is invalid, expired, or another error occurs,
   * Auth0 will usually re-render the login-email-verification screen, and the
   * `transaction.errors` array in the SDK's context will be updated with details
   * about the failure (e.g., error code `invalid-code`).
   *
   * @param {ContinueWithCodeOptions} payload - An object containing the `code` string entered by the user.
   *                                            It can also include any `CustomOptions` for extensibility.
   * @returns {Promise<void>} A promise that resolves when the form submission is initiated.
   *                          It does not return data directly upon resolution, as a redirect or
   *                          page re-render is the common outcome.
   * @throws {Error} Throws an error if `payload.code` is not provided or is not a string,
   *                 or if the `FormHandler` encounters an unrecoverable issue during submission (e.g., network error).
   *                 Validation errors from Auth0 (like an invalid code) are not thrown as JavaScript errors
   *                 but are reflected in `this.transaction.errors` after the operation.
   *
   * @example
   * ```typescript
   * // Assuming 'manager' is an instance of LoginEmailVerification
   * const userInputCode = "123456";
   * try {
   *   await manager.continueWithCode({ code: userInputCode });
   *   // If successful, page redirects. No further client-side action needed here.
   * } catch (error) {
   *   // This catch is for unexpected errors, not for Auth0 validation errors.
   *   console.error("Failed to submit the verification code:", error);
   * }
   * // After the await, always check manager.transaction.errors for server-side validation issues.
   * if (manager.transaction.errors && manager.transaction.errors.length > 0) {
   *   manager.transaction.errors.forEach(err => {
   *     if (err.code === 'invalid-code') {
   *       // Display "The code you entered is invalid" to the user.
   *     }
   *   });
   * }
   * ```
   */
  continueWithCode(payload: ContinueWithCodeOptions): Promise<void>;

  /**
   * Requests Auth0 to send a new verification code to the user's email address.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, so the browser reloads the page and the current JavaScript context,
   * including component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. Server-side errors,
   * such as rate limits, appear in `transaction.errors` (or `useErrors()` in React) on
   * the reloaded page. They don't reject the returned promise.
   *
   * To add a cooldown between resends, use `resendManager()` (or `useResend()` in React).
   * It stores its countdown in `localStorage`, so the countdown survives the reload.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new code was sent.
   */
  resendCode(payload?: ResendCodeOptions): Promise<void>;

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}