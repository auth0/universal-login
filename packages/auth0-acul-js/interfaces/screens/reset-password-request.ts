import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

export interface ResetPasswordRequestOptions {
  username: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface TransactionMembersOnResetPasswordRequest extends TransactionMembers {
  allowedIdentifiers: ('email' | 'username' | 'phone')[] | null;
  requiredIdentifiers: ('email' | 'username' | 'phone')[] | null;
  hasFlexibleIdentifier: boolean;
}

export interface ScreenMembersOnResetPasswordRequest extends ScreenMembers {
  data: {
    email?: string;
    username?: string;
  } | null;
}

export interface ResetPasswordRequestMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordRequest;
  transaction: TransactionMembersOnResetPasswordRequest;
  resetPassword(payload: ResetPasswordRequestOptions): Promise<void>;
  backToLogin(payload?: CustomOptions): Promise<void>;
}
