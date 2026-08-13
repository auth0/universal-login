import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
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
  googleOneTapConfig: GoogleOneTapConfig | null;
  /**
   * Intersected with the inherited `data` record rather than replacing it, so reads of any
   * other `screen.data` key keep compiling for existing consumers.
   */
  data:
    | (NonNullable<ScreenMembers['data']> & {
        username?: string;
        /**
         * The identifier input the screen should pre-select, as resolved by the server.
         *
         * Absent when the server has not resolved one — do not treat absence as `'email'`;
         * fall back to your own default instead. Mapped from the server's
         * `active_identifier_type`, which is not surfaced.
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
 */
export interface LoginOptions {
  /** The username/email to login with */
  username: string;
  /** The password for authentication */
  password: string;
  /** Optional captcha value if required */
  captcha?: string;
  /**
   * Which identifier `username` holds (for example `'phone'`).
   *
   * Supply it when your screen lets the user choose the identifier rather than typing an arbitrary
   * value — typically driven by `screen.data.activeIdentifierType` and `transaction.allowedIdentifiers`.
   * The submitted type is then authoritative: the server reads the value as that type instead of
   * inferring one from its shape, so an all-digits username is not mistaken for a phone number.
   *
   * Omit it to keep the existing behaviour, where `username` is submitted on its own and the server
   * infers what it is.
   */
  identifierType?: IdentifierType;
  /**
   * The ISO 3166-1 alpha-2 country the user selected for a phone identifier (for example `'US'`).
   *
   * Read only when `identifierType` is `'phone'`. Supply it when your screen renders a country
   * dropdown next to the phone number field, using a `code` from `countryCodes.available`. The
   * submitted country is then authoritative: the server prefixes its dial code rather than
   * inferring a country from the digits or from geo-IP, so `username` should be the national number
   * without a dial code.
   *
   * Omit it to have the server derive the country itself, with `pickCountryCode()` changing the
   * selection on a separate screen.
   */
  phoneCountryCode?: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

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
