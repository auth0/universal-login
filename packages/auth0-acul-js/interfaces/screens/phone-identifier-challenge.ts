import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers, ScreenData } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface PhoneChallengeOptions {
  code: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenDataOptions extends ScreenData {
  messageType?: 'text' | 'voice';
  phone?: 'string';
  resendLimitReached?: boolean;
}

export interface ExtendedScreenContext extends ScreenContext {
  data: {
    message_type: 'text' | 'voice';
    phone: string;
    resendLimitReached?: boolean;
  };
}

export interface ScreenMembersOnPhoneIdentifierChallenge extends ScreenMembers {
  data: {
    messageType?: 'text' | 'voice';
    phone?: string;
    resendLimitReached?: boolean;
    showLinkSms?: boolean;
    showLinkVoice?: boolean;
    showSwitchToPasswordButton?: boolean;
  } | null;
}

export interface PhoneIdentifierChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnPhoneIdentifierChallenge;
  submitPhoneChallenge(payload: PhoneChallengeOptions): Promise<void>;
  /**
   * Requests a new verification code for the user's phone number.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, or the captcha screen if a captcha is required. Either way the
   * browser loads a new page, and the current JavaScript context, including component
   * state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. Server-side errors,
   * such as rate limits, appear in `transaction.errors` (or `useErrors()` in React) on
   * the reloaded page. They don't reject the returned promise.
   *
   * To add a cooldown between resends, use `resendManager()` (or `useResend()` in React).
   * It stores its countdown in `localStorage`, so the countdown survives the reload.
   * It also disables resending when `screen.data.resendLimitReached` is `true`.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new code was sent.
   */
  resendCode(payload?: CustomOptions): Promise<void>;
  resendManager(options?: StartResendOptions): ResendControl;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
  switchToVoice(payload?: CustomOptions): Promise<void>;
  switchToText(payload?: CustomOptions): Promise<void>;
  switchToPassword(payload?: CustomOptions): Promise<void>;
}
