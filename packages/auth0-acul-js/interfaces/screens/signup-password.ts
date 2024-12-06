import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { TransactionContext, PasswordPolicy, TransactionMembers } from '../models/transaction';

export interface ScreenContextOnSignupPassword extends ScreenContext {
  links: {
    login: string;
    edit_identifier: string;
  };

  data: {
    email?: string;
    phone_number?: string;
    username?: string;
  };
}

export interface SignupPassword extends BaseContext {
  screen: ScreenContextOnSignupPassword;
}

export interface ScreenMembersOnSignupPassword extends ScreenMembers {
  loginLink: string | null;
  editLink: string | null;
  getScreenData(): {
    email?: string;
    phone?: string;
    username?: string;
  } | null;
}

export interface TransactionMembersOnSignupPassword extends TransactionMembers {
  isPasskeyEnabled: boolean;
  getPasswordPolicy(): PasswordPolicy | null;
  getRequiredIdentifiers(): ('email' | 'username' | 'phone')[] | null;
  getOptionalIdentifiers(): ('email' | 'username' | 'phone')[] | null;
}

export interface SignupPasswordOptions {
  email?: string;
  username?: string;
  phone?: string;
  password: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SignupPasswordMembers extends BaseMembers{
  screen: ScreenMembersOnSignupPassword;
  transaction: TransactionMembersOnSignupPassword;
  signup(payload: SignupPasswordOptions): Promise<void>;
}
