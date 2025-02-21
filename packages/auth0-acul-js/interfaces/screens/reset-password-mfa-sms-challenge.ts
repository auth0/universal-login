import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface MfaSmsChallengeOptions {
  code: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnResetPasswordMfaSmsChallenge extends ScreenMembers {
  data: {
    phone_number?: string;
    remember_device?: boolean;
  } | null;
}

export interface ResetPasswordMfaSmsChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaSmsChallenge;
  continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
  getACall(payload?: CustomOptions): Promise<void>;
}
