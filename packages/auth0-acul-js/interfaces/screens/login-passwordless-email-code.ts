import type { TransactionMembers } from '../../interfaces/models';
import type { BaseMembers } from '../../interfaces/models/base-context';
import type { ScreenMembers } from '../../interfaces/models/screen';
import type { CustomOptions } from '../common';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface ScreenMembersOnLoginPasswordlessEmailCode extends ScreenMembers {
  editIdentifierLink: string | null;
  resetPasswordLink: string | null;
  signupLink: string | null;
  data: {
    email?: string;
    username?: string;
  } | null;
}

export interface TransactionMembersOnLoginPasswordlessEmailCode extends TransactionMembers {
  isSignupEnabled: boolean | null;
}

export interface SubmitCodeOptions {
  code: string | number;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SwitchConnectionOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface LoginPasswordlessEmailCodeMembers extends BaseMembers {
  screen: ScreenMembersOnLoginPasswordlessEmailCode;
  transaction: TransactionMembersOnLoginPasswordlessEmailCode;
  submitCode(payload: SubmitCodeOptions): Promise<void>;
  /**
   * Requests a new one-time code for the user's email address.
   *
   * @remarks
   * Submits a form POST with `action: "resend"`. Auth0 responds by rendering this
   * screen again, or by returning to the login screen if a captcha is required.
   * Either way the browser loads a new page, and the current JavaScript context,
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
  resendCode(payload?: CustomOptions): Promise<void>;
  resendManager(options?: StartResendOptions): ResendControl;
  switchConnection(payload: SwitchConnectionOptions): Promise<void>;
}
