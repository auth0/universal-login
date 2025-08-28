import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { UntrustedDataMembers } from '../models/untrusted-data';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

export interface MfaSmsChallengeOptions {
  code: string;
  rememberDevice?: boolean;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface for the screen data specific to mfa-sms-challenge screen
 */
export interface ScreenMembersOnMfaSmsChallenge extends ScreenMembers {
  data: {
    /**
     * The phone number where the SMS was sent
     */
    phoneNumber?: string;
    /**
     * Whether to show the remember device option
     */
    showRememberDevice?: boolean;
    /**
     * Whether to show the link to switch to voice call verification
     */
    showLinkVoice?: boolean;
  } | null;
}

export interface MfaSmsChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnMfaSmsChallenge;
  untrustedData: UntrustedDataMembersOnMfaSmsChallenge;
  continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void>;
  pickSms(payload?: CustomOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
  getACall(payload?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}

/**
 * Interface for untrusted data specific to mfa-sms-challenge screen
 */
export interface UntrustedDataMembersOnMfaSmsChallenge extends UntrustedDataMembers {
  submittedFormData: {
    rememberDevice: boolean;
  } | null;
}
