import type { CustomOptions, StartResendOptions, ResendControl } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers, ScreenData } from '../models/screen';

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
  } | null;
}

export interface PhoneIdentifierChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnPhoneIdentifierChallenge;
  submitPhoneChallenge(payload: PhoneChallengeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
  resendManager(options?: StartResendOptions): ResendControl;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
}
