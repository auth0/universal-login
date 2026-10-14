import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

/**
 * Interface for the screen data specific to reset-password-mfa-email-challenge screen
 */
export interface ScreenMembersOnResetPasswordMfaEmailChallenge extends ScreenMembers {
  data: {
    email: string;
  } | null;
}

/**
 * Options for continuing with the email challenge.
 */
export interface ContinueOptions {
  /** The code entered by the user. */
  code: string;
  /** Indicates whether to remember the device. */
  rememberDevice?: boolean;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for resending the email code.
 */
export interface ResendCodeOptions {
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for trying another method.
 */
export interface TryAnotherMethodOptions {
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the reset-password-mfa-email-challenge screen
 */
export interface ResetPasswordMfaEmailChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaEmailChallenge;

  /**
   * Continues with the email challenge using the provided code.
   * @param payload The options containing the code and rememberDevice flag.
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Resends the email code.
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
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
