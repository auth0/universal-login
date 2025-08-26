import type { PasswordValidationResult } from '../../interfaces/models/screen'
import type { IdentifierType } from '../../src/constants';
import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers, UsernamePolicy, PasswordPolicy } from '../models/transaction';
export interface SignupOptions {
  email?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FederatedSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignup extends ScreenMembers {
  loginLink: string | null;
}

export interface TransactionMembersOnSignup extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
  passwordPolicy: PasswordPolicy | null;
}

export interface SignupMembers extends BaseMembers {
  screen: ScreenMembersOnSignup;
  transaction: TransactionMembersOnSignup;
  signup(payload: SignupOptions): Promise<void>;
  federatedSignup(payload: FederatedSignupOptions): Promise<void>;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  validatePassword(password: string): PasswordValidationResult;
}
