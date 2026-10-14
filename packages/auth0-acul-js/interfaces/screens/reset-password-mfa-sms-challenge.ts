import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface MfaSmsChallengeOptions {
  code: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnResetPasswordMfaSmsChallenge extends ScreenMembers {
  data: {
    phoneNumber: string;
    /**
     * Whether to show the link to switch to voice call verification
     */
    showLinkVoice?: boolean;
  } | null;
}

export interface ResetPasswordMfaSmsChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaSmsChallenge;
  continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void>;
  /**
   * Resends the SMS code.
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
  resendCode(payload?: CustomOptions): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
  getACall(payload?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
