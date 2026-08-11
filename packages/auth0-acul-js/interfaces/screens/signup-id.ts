import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { TransactionMembers, UsernamePolicy } from '../models/transaction';
import type { UntrustedDataContext } from '../models/untrusted-data';
import type { Identifier } from '../utils/signup-identifiers';
import type { UsernameValidationResult } from '../utils/validate-username';
interface ExtendedScreenContext extends ScreenContext {
  links: {
    login: string;
  };
}

interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: {
    /* this object is opt-in */
    email?: string;
    phone?: string;
    username?: string;
    [key: string]: string | undefined; // keys like "ulp_xxx" are allowed
  };
}

export interface ScreenMembersOnSignupId extends ScreenMembers {
  loginLink: string | null;
  googleOneTapConfig: GoogleOneTapConfig | null;
}

export interface TransactionMembersOnSignupId extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
}

export interface SignupId extends BaseContext {
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext;
}

export interface FederatedSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface SignupOptions {
  email?: string;
  username?: string;
  phone?: string;
  /**
   * The ISO 3166-1 alpha-2 country the user selected for `phone` (for example `'US'`).
   *
   * Supply it when your screen renders a country dropdown next to the phone number field, using a
   * `code` from `countryCodes.available`. The submitted country is then authoritative: the server
   * prefixes its dial code rather than inferring a country from the digits or from geo-IP, so
   * `phone` should be the national number without a dial code.
   *
   * Omit it to keep the existing behaviour, where the server derives the country itself and
   * `pickCountryCode()` changes the selection on a separate screen.
   *
   * Requires typed form processing to be enabled server-side. Note that `countryCodes` being
   * populated does not imply it: the country list is a per-screen context opt-in, resolved
   * independently of the flag that gates the composite submission. Until that flag is on the
   * server ignores the composite fields, and because they replace `phone_number` the submission
   * carries no phone number at all and the signup fails. Leave `phoneCountryCode` unset on
   * tenants where composite submission is not yet enabled.
   */
  phoneCountryCode?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SignupIdMembers extends BaseMembers {
  screen: ScreenMembersOnSignupId;
  transaction: TransactionMembersOnSignupId;
  signup(payload: SignupOptions): Promise<void>;
  federatedSignup(payload: FederatedSignupOptions): Promise<void>;
  googleOneTap(payload: GoogleOneTapOptions): Promise<void>;
  getSignupIdentifiers(): Identifier[] | null;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  validateUsername(username: string): UsernameValidationResult;
}
