import type { TransactionMembers } from '../../interfaces/models/transaction';
import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenContext } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface ScreenContextOnLoginPasswordlessSmsOtp extends ScreenContext {
  links: {
    edit_identifier: string;
    reset_password: string;
    signup: string;
  };
}
export interface ScreenMembersOnLoginPasswordlessSmsOtp extends ScreenMembers {
  signupLink: string | null;
  resetPasswordLink: string | null;
  backLink: string | null;
  data: {
    username: string;
    phone_number: string;
  };
}

export interface TransactionMembersOnLoginPasswordlessSmsOtp extends TransactionMembers {
  isSignupEnabled: boolean;
}

export interface SubmitOTPOptions {
  username?: string;
  code: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SwitchConnectionOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface LoginPasswordlessSmsOtpMembers extends BaseMembers {
  screen: ScreenMembersOnLoginPasswordlessSmsOtp;
  transaction: TransactionMembersOnLoginPasswordlessSmsOtp;
  submitOTP(payload: SubmitOTPOptions): Promise<void>;
  /**
   * Requests a new one-time code for the user's phone number.
   *
   * @remarks
   * Submits a form POST with `action: "resend"`. Auth0 responds by rendering this
   * screen again, or by returning to the login screen if a captcha is required.
   * Either way the browser loads a new page, and the current JavaScript context,
   * including component state and timers, is lost.
   *
   * Code after `await resendOTP()` may still run, but anything it sets up, such as a
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
  resendOTP(payload?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
  switchConnection(payload: SwitchConnectionOptions): Promise<void>;
}
