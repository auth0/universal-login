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
  /** Intersected with the inherited `data`, so reads of other `screen.data` keys keep compiling. */
  data:
    | (NonNullable<ScreenMembers['data']> & {
        username?: string;
        /**
         * The identifier input to pre-select, from the server's `active_identifier_type`. Absent when
         * none was resolved — supply your own default rather than assuming `'email'`.
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
 * The identifier itself is described by {@link LoginIdentifierOptions}: whichever type it is — email
 * address, phone number or username — it goes in the one field, and `identifierType` names what that
 * field holds. For `identifierType: 'phone'` it should be the national number, with the country named
 * in `phoneCountryCode`.
 */
export type LoginOptions = LoginIdentifierOptions & {
  /** The password for authentication */
  password: string;
  /** Optional captcha value if required */
  captcha?: string;
  /**
   * Which identifier the `identifier` field holds (for example `'phone'`) — typically from
   * `screen.data.activeIdentifierType`. The server then reads the value as that type instead of
   * inferring one from its shape. Omit it and the identifier is submitted on its own, as before.
   */
  identifierType?: IdentifierType;
  /**
   * ISO 3166-1 alpha-2 country for a phone identifier (for example `'US'`), from a `code` in
   * `countryCodes.available`. Required with `identifierType: 'phone'`, ignored otherwise. Its dial
   * code is prefixed server-side, so the identifier should be the national number without one.
   * Omitted, the submission degrades to the untyped contract, which prefixes a `pickCountryCode()`
   * selection only on a phone-only connection.
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
