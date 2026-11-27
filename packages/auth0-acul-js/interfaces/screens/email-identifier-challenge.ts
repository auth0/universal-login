import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface EmailChallengeOptions {
  code: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnEmailIdentifierChallenge extends ScreenMembers {
  data: {
    messageType?: string;
    email?: string;
    resendLimitReached?: boolean;
    showSwitchToPasswordButton?: boolean;
  } | null;
}

export interface EmailIdentifierChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnEmailIdentifierChallenge;
  submitEmailChallenge(payload: EmailChallengeOptions): Promise<void>;
  /**
   * Requests a new verification code for the user's email address.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, or the `interstitial-captcha` screen if a captcha is required. Either
   * way the browser loads a new page, and the current JavaScript context, including
   * component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. If the resend fails,
   * for example because of a rate limit, Auth0 renders this screen again without an
   * error, so that it doesn't reveal whether the user exists. Nothing appears in
   * `transaction.errors` (or `useErrors()` in React), and the returned promise doesn't
   * reject.
   *
   * To add a cooldown between resends, use `resendManager()` (or `useResend()` in React).
   * It stores its countdown in `localStorage`, so the countdown survives the reload.
   * It also disables resending when `screen.data.resendLimitReached` is `true`.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the new page
   * loads. It doesn't confirm that a new code was sent.
   */
  resendCode(payload?: CustomOptions): Promise<void>;
  resendManager(payload?: StartResendOptions): ResendControl;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
  switchToPassword(payload?: CustomOptions): Promise<void>;
}
