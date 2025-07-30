import type { TransactionMembers } from '../../interfaces/models';
import type { BaseMembers } from '../../interfaces/models/base-context';
import type { ScreenMembers } from '../../interfaces/models/screen';
import type { CustomOptions } from '../common';

export interface ScreenMembersOnLoginPasswordlessEmailCode extends ScreenMembers {
  editIdentifierLink: string | null;
  resetPasswordLink: string | null;
  signupLink: string | null;
  data: {
    email?: string;
    username?: string;
  } | null;
}

export interface TransactionMembersOnLoginPasswordlessEmailCode extends TransactionMembers {
  isSignupEnabled: boolean | null;
}

export interface SubmitCodeOptions {
  code: string | number;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface LoginPasswordlessEmailCodeMembers extends BaseMembers {
  screen: ScreenMembersOnLoginPasswordlessEmailCode;
  transaction: TransactionMembersOnLoginPasswordlessEmailCode;
  submitCode(payload: SubmitCodeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
}
