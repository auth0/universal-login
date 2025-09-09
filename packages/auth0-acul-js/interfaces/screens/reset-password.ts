import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenData, PasswordRuleValidation} from '../models/screen';
import type { TransactionMembers, PasswordPolicy } from '../models/transaction';

export interface ResetPasswordOptions {
  'password-reset': string;
  're-enter-password': string;
  [key: string]: string | number | boolean | undefined;
}
export interface ScreenDataOptions extends ScreenData {
  username?: string;
}
export interface ScreenMembersOnResetPassword extends ScreenMembers {
  data: {
    username?: string;
  } | null;
}
export interface ResetPasswordMembers extends BaseMembers {
  screen: ScreenMembersOnResetPassword;
  transaction: TransactionMembersOnResetPassword;
  resetPassword(payload: ResetPasswordOptions): Promise<void>;
  validatePassword(password: string): PasswordRuleValidation[];
}

export interface TransactionMembersOnResetPassword extends TransactionMembers {
  passwordPolicy: PasswordPolicy | null;
}
