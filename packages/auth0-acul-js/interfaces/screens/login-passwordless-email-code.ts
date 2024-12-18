import { CustomOptions } from '../common';
import type { ScreenMembers } from '../../interfaces/models/screen';
import { BaseMembers } from '../../interfaces/models/base-context';
import { TransactionMembers } from '../../interfaces/models';


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
  submitCode(payload: SubmitCodeOptions): Promise<void>;
  resendCode(payload?: CustomOptions): Promise<void>;
}
