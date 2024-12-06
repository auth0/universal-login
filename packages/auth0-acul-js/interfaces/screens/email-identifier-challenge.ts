import { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import { ScreenMembers } from '../models/screen';

export interface EmailChallengeOptions {
  code: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnEmailIdentifierChallenge extends ScreenMembers {
  getScreenData(): {
    messageType?: string;
    email?: string;
  } | null;
}

export interface EmailIdentifierChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnEmailIdentifierChallenge;
  submitEmailChallenge(payload: EmailChallengeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
}
