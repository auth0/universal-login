import type { CustomOptions, StartResendOptions, ResendControl } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

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
  } | null;
}

export interface EmailIdentifierChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnEmailIdentifierChallenge;
  submitEmailChallenge(payload: EmailChallengeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  startResend(options?: StartResendOptions): ResendControl;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
}
