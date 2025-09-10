import type { CustomOptions, StartResendOptions, ResendControl } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { UntrustedDataMembers } from '../models/untrusted-data';

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
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when the new code is sent
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.resendCode();
   * ```
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
