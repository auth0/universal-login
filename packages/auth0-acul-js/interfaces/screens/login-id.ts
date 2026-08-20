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
  /** Intersected with the inherited `data`, so other `screen.data` reads keep compiling. */
  data:
    | (NonNullable<ScreenMembers['data']> & {
        /** The identifier input to pre-select. Absent when the server resolved none — use your own default. */
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
 * The identifier is described by {@link LoginIdentifierOptions}. On this screen its shape still
 * decides which authentication method the user is routed to.
 */
export type LoginOptions = LoginIdentifierOptions & {
  captcha?: string;
  /** What `identifier` holds — typically from `screen.data.activeIdentifierType`. Omit to submit untyped. */
  identifierType?: IdentifierType;
  /**
   * ISO 3166-1 alpha-2 country for a phone identifier, from a `code` in `countryCodes.available`.
   * Required with `identifierType: 'phone'`. The dial code is prefixed server-side, so pass the
   * national number.
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
