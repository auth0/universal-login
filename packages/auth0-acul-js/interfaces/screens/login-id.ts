import type { IdentifierType } from '../../src/constants';
import type { CustomOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers, PasskeyRead } from '../models/screen';
import type { TransactionMembers, UsernamePolicy } from '../models/transaction';
import type { UntrustedDataContext } from '../models/untrusted-data';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
  };

  data?: {
    passkey?: PasskeyRead;
  };
}

export interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: {
    /* this object is opt-in */ username: string;
    'ulp_{someField}'?: string; // Custom Prompts Fields
  };
}

export interface LoginId extends BaseContext {
  screen: ExtendedScreenContext;
  untrustedData?: ExtendedUntrustedDataContext;
}

export interface ScreenMembersOnLoginId extends ScreenMembers {
  signupLink: string | null;
  resetPasswordLink: string | null;
  publicKey: PasskeyRead['public_key'] | null;
}

export interface TransactionMembersOnLoginId extends TransactionMembers {
  isSignupEnabled: boolean;
  isPasskeyEnabled: boolean;
  isForgotPasswordEnabled: boolean;
  isUsernameRequired: boolean;
  usernamePolicy: UsernamePolicy | null;
  allowedIdentifiers: IdentifierType[] | null;
}

export interface LoginOptions {
  username: string;
  captcha?: string;
  /** Optional language code for locale change with auto-submission */
  language?: string;
  /** Optional persistence scope for language preference */
  persist?: 'session';
  /** Optional password field (for third-party captcha scenarios) */
  password?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FederatedLoginOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

/**
 * Options for changing language with prompt re-render on login-id screen
 */
export interface ChangeLanguageOptions {
  /** The username/email/phone identifier */
  username?: string;
  /** Optional password field (for third-party captcha scenarios) */
  password?: string;
  /** The language code to change to */
  language: string;
  /** Persistence scope for language preference */
  persist?: 'session';
  /** Optional captcha value if required */
  captcha?: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for passkey authentication with language support
 */
export interface PasskeyLoginOptions {
  /** Optional language code for locale change with auto-submission */
  language?: string;
  /** Optional persistence scope for language preference */
  persist?: 'session';
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

export interface LoginIdMembers extends BaseMembers {
  screen: ScreenMembersOnLoginId;
  transaction: TransactionMembersOnLoginId;
  login(payload: LoginOptions): Promise<void>;
  federatedLogin(payload: FederatedLoginOptions): Promise<void>;
  passkeyLogin(payload?: PasskeyLoginOptions): Promise<void>;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  /**
   * Changes the language with prompt re-render
   * @param payload The language change options
   */
  changeLanguage(payload: ChangeLanguageOptions): Promise<void>;
  getLoginIdentifiers(): IdentifierType[] | null;
}
