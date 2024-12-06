import type { BaseContext } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { UntrustedDataContext } from '../models/untrusted-data';
import type { TransactionMembers, UsernamePolicy } from '../models/transaction';

interface ExtendedScreenContext extends ScreenContext {
  links: {
    login: string;
  };
}

interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: {
    /* this object is opt-in */ email?: string;
    phone?: string;
    username?: string;
    'ulp_{someField}'?: string; // Custom Prompts Fields
  };
}

export interface ScreenMembersOnSignupId extends ScreenMembers {
  loginLink: string | null;
}

export interface TransactionMembersOnSignupId extends TransactionMembers {
  isPasskeyEnabled: boolean;
  getUsernamePolicy(): UsernamePolicy | null;
  getRequiredIdentifiers(): ('email' | 'username' | 'phone')[] | null;
  getOptionalIdentifiers(): ('email' | 'username' | 'phone')[] | null;
}

export interface SignupId extends BaseContext {
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext;
}

export interface SocialSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface SignupOptions {
  email?: string;
  username?: string;
  phone?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SignupIdMembers {
  screen: ScreenMembersOnSignupId;
  transaction: TransactionMembersOnSignupId;
  signup(payload: SignupOptions): Promise<void>;
  socialSignup(payload: SocialSignupOptions):  Promise<void>;
}
