import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers, PasskeyRead } from '../models/screen';
import type { TransactionMembers, UsernamePolicy, DBConnection } from '../models/transaction';
import type { UntrustedDataContext } from '../models/untrusted-data';

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
  /**
   * Intersected with the inherited `data` record rather than replacing it, so reads of any
   * other `screen.data` key keep compiling for existing consumers.
   */
  data:
    | (NonNullable<ScreenMembers['data']> & {
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

export interface TransactionMembersOnLoginId extends TransactionMembers {
  isSignupEnabled: boolean;
  isPasskeyEnabled: boolean;
  showPasskeyAutofill: boolean;
  isForgotPasswordEnabled: boolean;
  isUsernameRequired: boolean;
  usernamePolicy: UsernamePolicy | null;
  allowedIdentifiers: IdentifierType[] | null;
}

export interface LoginOptions {
  username: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

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
