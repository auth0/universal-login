import type { Identifier } from '../../interfaces/utils/get-enabled-identifiers';
import type { PasswordValidationResult } from '../../interfaces/utils/validate-password';
import type { UsernameValidationResult } from '../../interfaces/utils/validate-username';
import type { IdentifierType } from '../../src/constants';
import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers, UsernamePolicy, PasswordPolicy } from '../models/transaction';
export interface SignupOptions {
  email?: string;
  username?: string;
  phoneNumber?: string;
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
}

export interface TransactionMembersOnSignup extends TransactionMembers {
  isPasskeyEnabled: boolean;
  usernamePolicy: UsernamePolicy | null;
  requiredIdentifiers: IdentifierType[] | null;
  optionalIdentifiers: IdentifierType[] | null;
  passwordPolicy: PasswordPolicy | null;
}

export interface SignupMembers extends BaseMembers {
  screen: ScreenMembersOnSignup;
  transaction: TransactionMembersOnSignup;
  signup(payload: SignupOptions): Promise<void>;
  federatedSignup(payload: FederatedSignupOptions): Promise<void>;
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
 * const identifiers = authClient.getEnabledIdentifiers();
 * if (identifiers) {
 *   identifiers.forEach(({ type, required }) => {
 *     console.log(`${type} is ${required ? 'required' : 'optional'}`);
 *   });
 * }
 * ```
 *
 * @see Identifier
 */
  getEnabledIdentifiers(): Identifier[] | null;
  validateUsername(username: string): UsernameValidationResult;
}
