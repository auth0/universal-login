import type { PasswordValidationResult } from '../../interfaces/utils/validate-password';
import type { IdentifierType } from '../../src/constants';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { PasswordPolicy, TransactionMembers } from '../models/transaction';

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

export interface FederatedSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignupPassword extends ScreenMembers {
  loginLink: string | null;
  editLink: string | null;
  data: {
    email?: string;
    phoneNumber?: string;
    username?: string;
  } | null;
}

export interface TransactionMembersOnSignupPassword extends TransactionMembers {
  isPasskeyEnabled: boolean;
  passwordPolicy: PasswordPolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
}

export interface SignupPasswordOptions {
  email?: string;
  username?: string;
  phoneNumber?: string;
  password: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SignupPasswordMembers extends BaseMembers {
  screen: ScreenMembersOnSignupPassword;
  transaction: TransactionMembersOnSignupPassword;
  signup(payload: SignupPasswordOptions): Promise<void>;
  federatedSignup(payload: FederatedSignupOptions): Promise<void>;
  validatePassword(password: string): PasswordValidationResult;
}
