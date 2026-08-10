import type { PasswordValidationResult } from '../../interfaces/utils/validate-password';
import type { UsernameValidationResult } from '../../interfaces/utils/validate-username';
import type { IdentifierType } from '../../src/constants';
import type { CustomOptions, GoogleOneTapConfig, GoogleOneTapOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers, UsernamePolicy, PasswordPolicy, PasswordComplexityPolicy } from '../models/transaction';
import type { Identifier } from '../utils/signup-identifiers';
export interface SignupOptions {
  email?: string;
  username?: string;
  phoneNumber?: string;
  /**
   * The ISO 3166-1 alpha-2 country the user selected for `phoneNumber` (for example `'US'`).
   *
   * Supply it when your screen renders a country dropdown next to the phone number field, using a
   * `code` from `countryCodes.available`. The submitted country is then authoritative:
   * the server prefixes its dial code rather than inferring a country from the digits or from
   * geo-IP, so `phoneNumber` should be the national number without a dial code.
   *
   * Omit it to keep the existing behaviour, where the server derives the country itself and
   * `pickCountryCode()` changes the selection on a separate screen.
   */
  phoneCountryCode?: string;
  password?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface FederatedSignupOptions {
  connection: string;
  [key: string]: string | number | boolean;
}

export interface ScreenMembersOnSignup extends ScreenMembers {
  loginLink: string | null;
  googleOneTapConfig: GoogleOneTapConfig | null;
}

export interface TransactionMembersOnSignup extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
  passwordPolicy: PasswordPolicy | null;
  passwordComplexityPolicy: PasswordComplexityPolicy | null;
}

export interface SignupMembers extends BaseMembers {
  screen: ScreenMembersOnSignup;
  transaction: TransactionMembersOnSignup;
  signup(payload: SignupOptions): Promise<void>;
  federatedSignup(payload: FederatedSignupOptions): Promise<void>;
  googleOneTap(payload: GoogleOneTapOptions): Promise<void>;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  validatePassword(password: string): PasswordValidationResult;
  /**
 * Returns a list of enabled identifiers (e.g. email, phone, username)
 * based on the current transaction state.
 *
 * Identifiers may be required or optional depending on the connection strategy
 * and configuration provided during the authentication or signup flow.
 *
 * @returns An array of enabled {@link Identifier} objects, or `null` if the transaction is not initialized.
 *
 * @example
 * ```ts
 * const identifiers = authClient.getSignupIdentifiers();
 * if (identifiers) {
 *   identifiers.forEach(({ type, required }) => {
 *     console.log(`${type} is ${required ? 'required' : 'optional'}`);
 *   });
 * }
 * ```
 * @utilityFeature
 * @see Identifier
 */
  getSignupIdentifiers(): Identifier[] | null;
  validateUsername(username: string): UsernameValidationResult;
}
