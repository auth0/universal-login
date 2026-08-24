import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { TransactionContext, TransactionMembers, DBConnection, PasswordPolicy } from '../models/transaction';
import type { LoginIdentifierOptions } from '../utils/typed-identifier';
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
  googleOneTapConfig: GoogleOneTapConfig | null;
  /** Intersected with the inherited `data`, so other `screen.data` reads keep compiling. */
  data:
    | (NonNullable<ScreenMembers['data']> & {
        username?: string;
        /**
         * The identifier input to pre-select. Absent when the server resolved none — fall back to
         * the first of `email`, `username`, `phone` in `getLoginIdentifiers()`.
         */
        activeIdentifierType?: IdentifierType;
      })
    | null;
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
  passwordPolicy: PasswordPolicy | null;
  allowedIdentifiers: IdentifierType[] | null;
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
 *
 * @remarks
 * The identifier is described by {@link LoginIdentifierOptions}.
 */
export type LoginOptions = LoginIdentifierOptions & {
  /** The password for authentication */
  password: string;
  /** Optional captcha value if required */
  captcha?: string;
  /** What `identifier` holds — typically from `screen.data.activeIdentifierType`. Omit to submit untyped. */
  identifierType?: IdentifierType;
  /**
   * ISO 3166-1 alpha-2 country for a phone identifier, from a `code` in `countryCodes.available`.
   * Required with `identifierType: 'phone'`. The dial code is prefixed server-side, so pass the
   * national number — unparenthesized, as `(201) 555-0123` is submitted unprefixed. Omitting the
   * country submits untyped, leaving the server to resolve one.
   */
  phoneCountryCode?: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
};

/**
 * Options for performing social login operations
 */
export interface FederatedLoginOptions {
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
  federatedLogin(payload: FederatedLoginOptions): Promise<void>;
  /**
   * Picks country code for phone number input
   * @param payload Optional custom options
   */
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  /**
   * Submits a Google One Tap credential to complete authentication
   * @param payload The Google ID token returned by the GSI SDK
   */
  googleOneTap(payload: GoogleOneTapOptions): Promise<void>;
  /**
   * Gets the active identifier types for the login screen
   * @returns An array of active identifier types or null if none are active
   * @utilityFeature
   */
  getLoginIdentifiers(): IdentifierType[] | null;
}
