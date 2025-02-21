import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface MfaSmsChallengeOptions {
  code: string;
  rememberBrowser?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnMfaSmsChallenge extends ScreenMembers {
  data: {
    phone_number?: string;
    remember_device?: boolean;
  } | null;
}

export interface MfaSmsChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnMfaSmsChallenge;
  continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void>;
  pickSms(payload?: CustomOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
  getACall(payload?: CustomOptions): Promise<void>;
}
