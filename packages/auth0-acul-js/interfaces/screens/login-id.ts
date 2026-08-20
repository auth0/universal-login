import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers, PasskeyRead } from '../models/screen';
import type { TransactionMembers, UsernamePolicy, DBConnection } from '../models/transaction';
import type { UntrustedDataContext } from '../models/untrusted-data';
import type { LoginIdentifierOptions } from '../utils/typed-identifier';

/**
 * Extended DBConnection interface for login-id screen with passkey autofill support
 */
export interface DBConnectionWithPasskeyAutofill extends DBConnection {
  options: DBConnection['options'] & {
    authentication_methods: {
      passkey: {
        enabled: boolean;
        showPasskeyAutofill?: boolean;
      };
    };
  };
}

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
  };

  data?: {
    passkey?: PasskeyRead;
    active_identifier_type?: IdentifierType;
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
  googleOneTapConfig: GoogleOneTapConfig | null;
  /** Intersected with the inherited `data`, so reads of other `screen.data` keys keep compiling. */
  data:
    | (NonNullable<ScreenMembers['data']> & {
        /**
         * The identifier input to pre-select, resolved by the server and mapped from its
         * `active_identifier_type`. Absent when none was resolved — supply your own default rather
         * than assuming `'email'`.
         */
        activeIdentifierType?: IdentifierType;
      })
    | null;
}

export interface TransactionMembersOnLoginId extends TransactionMembers {
  isSignupEnabled: boolean;
  isPasskeyEnabled: boolean;
  showPasskeyAutofill: boolean;
  isForgotPasswordEnabled: boolean;
  isUsernameRequired: boolean;
  usernamePolicy: UsernamePolicy | null;
  allowedIdentifiers: IdentifierType[] | null;
}

/**
 * @remarks
 * The identifier itself is described by {@link LoginIdentifierOptions}: whichever type it is — email
 * address, phone number or username — it goes in the one field, and `identifierType` names what that
 * field holds. On this screen the value's shape still decides which authentication method the user is
 * routed to. For `identifierType: 'phone'` it should be the national number, with the country named
 * in `phoneCountryCode`.
 */
export type LoginOptions = LoginIdentifierOptions & {
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
  [key: string]: string | number | boolean | undefined;
};

export interface FederatedLoginOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface LoginIdMembers extends BaseMembers {
  screen: ScreenMembersOnLoginId;
  transaction: TransactionMembersOnLoginId;
  login(payload: LoginOptions): Promise<void>;
  federatedLogin(payload: FederatedLoginOptions): Promise<void>;
  passkeyLogin(payload?: CustomOptions): Promise<void>;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  googleOneTap(payload: GoogleOneTapOptions): Promise<void>;
  getLoginIdentifiers(): IdentifierType[] | null;
  registerPasskeyAutofill(inputId?: string): Promise<void>;
}
