import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { TransactionContext, TransactionMembers, DBConnection, PasswordPolicy } from '../models/transaction';

/**
 * Extended screen context interface for the login screen
 */
export interface ScreenContextOnLogin extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
  };
}

/**
 * Extended screen members interface for the login screen
 */
export interface ScreenMembersOnLogin extends ScreenMembers {
  signupLink: string | null;
  resetPasswordLink: string | null;
  data: {
    username?: string;
  } | null;
}

/**
 * Extended transaction context interface for the login screen
 */
export interface TransactionContextOnLogin extends TransactionContext {
  connection: DBConnection;
}

/**
 * Extended transaction members interface for the login screen
 */
export interface TransactionMembersOnLogin extends TransactionMembers {
  isSignupEnabled: boolean;
  isForgotPasswordEnabled: boolean;
  isPasskeyEnabled: boolean;
  getPasswordPolicy(): PasswordPolicy | null;
}

/**
 * Login screen interface extending base context
 */
export interface Login extends BaseContext {
  screen: ScreenContextOnLogin;
  transaction: TransactionContextOnLogin;
}

/**
 * Options for performing login operations
 */
export interface LoginOptions {
  /** The username/email to login with */
  username: string;
  /** The password for authentication */
  password: string;
  /** Optional captcha value if required */
  captcha?: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for performing social login operations
 */
export interface SocialLoginOptions {
  /** The social connection name to use */
  connection: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean;
}

/**
 * Login screen members interface extending base members
 */
export interface LoginMembers extends BaseMembers {
  screen: ScreenMembersOnLogin;
  transaction: TransactionMembersOnLogin;
  /**
   * Performs login with username/password
   * @param payload The login options
   */
  login(payload: LoginOptions): Promise<void>;
  /**
   * Performs login with social provider
   * @param payload The social login options
   */
  socialLogin(payload: SocialLoginOptions): Promise<void>;
}
