import type { CustomOptions, StartResendOptions } from '../common';
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
  resendManager(payload?: StartResendOptions): () => Promise<void>;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
}
