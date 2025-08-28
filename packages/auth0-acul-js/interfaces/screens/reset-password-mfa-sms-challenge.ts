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
  resendCode(payload?: CustomOptions): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
  getACall(payload?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
