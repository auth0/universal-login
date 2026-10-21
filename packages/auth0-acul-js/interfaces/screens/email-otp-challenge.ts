import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

/**
 * Represents the members of the Email OTP Challenge screen.
 * Extends the base ScreenMembers interface.
 */
export interface ScreenMembersOnEmailOTPChallenge extends ScreenMembers {
  // Add any specific members for this screen here
}

export interface OtpCodeOptions extends CustomOptions {
   /**
   * The OTP code that the user enters to submit.
   */
  code: string;
}

// test data*********
/**
 * Represents the Email OTP Challenge screen interface.
 */
export interface EmailOTPChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnEmailOTPChallenge;
  /**
   * Submits the OTP code entered by the user.
   * @param options Optional parameters to include in the submission.
   */
  submitCode(options: OtpCodeOptions): Promise<void>;
  /**
   * Requests a new OTP code to be sent to the user's email.
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
   * @param options - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new code was sent.
   */
  resendCode(options?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
