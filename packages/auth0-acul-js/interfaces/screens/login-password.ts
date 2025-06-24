import type { IdentifierType } from '../../src/constants';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { TransactionContext, TransactionMembers, DBConnection, PasswordPolicy, UsernamePolicy } from '../models/transaction';

export interface ScreenContextOnLoginPassword extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
    edit_identifier: string;
  };
}

export interface ScreenMembersOnLoginPassword extends ScreenMembers {
  signupLink: string | null;
  resetPasswordLink: string | null;
  editIdentifierLink: string | null;
  data: {
    username: string;
  } | null;
}

export interface TransactionContextOnLoginPassword extends TransactionContext {
  connection: DBConnection;
}

export interface TransactionMembersOnLoginPassword extends TransactionMembers {
  isSignupEnabled: boolean;
  isForgotPasswordEnabled: boolean;
  isPasskeyEnabled: boolean;
  getPasswordPolicy(): PasswordPolicy | null;
  getUsernamePolicy(): UsernamePolicy | null;
  getAllowedIdentifiers(): IdentifierType[] | null;
}

export interface LoginPassword extends BaseContext {
  screen: ScreenContextOnLoginPassword;
  transaction: TransactionContextOnLoginPassword;
}

export interface LoginPasswordOptions {
  username: string;
  password: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FederatedLoginOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface LoginPasswordMembers extends BaseMembers {
  screen: ScreenMembersOnLoginPassword;
  login(payload: LoginPasswordOptions): Promise<void>;
  federatedLogin(payload: FederatedLoginOptions): Promise<void>;
}
