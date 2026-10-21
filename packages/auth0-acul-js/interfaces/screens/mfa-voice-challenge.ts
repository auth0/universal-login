import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { UntrustedDataMembers } from '../models/untrusted-data';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

/**
 * Options for submitting the voice challenge code.
 */
export interface MfaVoiceChallengeContinueOptions {
  /**
   * The verification code received via voice call.
   */
  code: string;

  /**
   * Optional flag to remember the device for 30 days, skipping future MFA challenges.
   */
  rememberDevice?: boolean;

  /**
   * Additional custom options to pass with the request.
   */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Extended screen members interface for the MFA Voice Challenge screen.
 */
export interface ScreenMembersOnMfaVoiceChallenge extends ScreenMembers {
  /**
   * Additional screen data specific to MFA voice challenge.
   */
  data: {
    /**
     * The phone number where the voice code was sent.
     */
    phoneNumber?: string;

    /**
     * Whether to show the remember device option.
     */
    showRememberDevice?: boolean;

    /**
     * Whether to show the link to switch to SMS verification.
     */
    showLinkSms?: boolean;
  } | null;
}

/**
 * Interface defining all members and operations available on the MFA Voice Challenge screen.
 */
export interface MfaVoiceChallengeMembers extends BaseMembers {
  /**
   * Screen-specific properties and data.
   */
  screen: ScreenMembersOnMfaVoiceChallenge;

  untrustedData: UntrustedDataMembersOnMfaVoiceChallenge;

  /**
   * Submits the voice verification code to validate the MFA challenge.
   *
   * @param payload - Object containing the verification code and optional parameters
   * @returns Promise that resolves when the code is successfully validated
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.continue({
   *   code: '123456',
   *   rememberDevice: true
   * });
   * ```
   */
  continue(payload: MfaVoiceChallengeContinueOptions): Promise<void>;

  /**
   * Navigates to the screen for selecting a different phone number.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when navigation is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.pickPhone();
   * ```
   */
  pickPhone(payload?: CustomOptions): Promise<void>;

  /**
   * Switches to SMS verification method instead of voice call.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when switching is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.switchToSms();
   * ```
   */
  switchToSms(payload?: CustomOptions): Promise<void>;

  /**
   * Requests a new voice call with a verification code.
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

  /**
   * Navigates to the screen for selecting an alternative MFA method.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when navigation is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.tryAnotherMethod();
   * ```
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}

/**
 * Interface for untrusted data specific to mfa-voice-challenge screen
 */
export interface UntrustedDataMembersOnMfaVoiceChallenge extends UntrustedDataMembers {
  submittedFormData: {
    rememberDevice: boolean;
  } | null;
}
