import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers, UsernamePolicy } from '../models/transaction';

export interface SignupOptions {
  email?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SocialSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignup extends ScreenMembers {
  data: {
    name?: string;
    loginLink?: string;
  } | null;
}

export interface TransactionMembersOnSignup extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: ('email' | 'username' | 'phone')[] | null;
  optionalIdentifiers: ('email' | 'username' | 'phone')[] | null;
}

export interface SignupMembers extends BaseMembers {
  screen: ScreenMembersOnSignup;
  signup(payload: SignupOptions): Promise<void>;
}
