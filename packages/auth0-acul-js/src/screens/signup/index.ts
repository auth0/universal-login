import { ScreenIds, FormActions } from '../../constants';
import coreGetIdentifier from '../../helpers/getEnabledIdentifiers';
import coreValidatePassword from '../../helpers/validatePassword';
import coreValidateUsername from '../../helpers/validateUsername';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { Identifier } from '../../../interfaces/models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { PasswordRuleValidation, UsernameValidationResult } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupMembers,
  ScreenMembersOnSignup as ScreenOptions,
  SignupOptions,
  FederatedSignupOptions,
  TransactionMembersOnSignup as TransactionOptions,
} from '../../../interfaces/screens/signup';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class Signup extends BaseContext implements SignupMembers {
  static screenIdentifier: string = ScreenIds.SIGNUP;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;

    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }
  /**
   * @remarks
   * This method handles the submission of the signup form.
   *
   * @example
   * ```typescript
   * import Signup from '@auth0/auth0-acul-js/signup';
   *
   * const signupManager = new Signup();
   *
   * signupManager.signup({
   *  email: 'test@example.com',
   *  password: 'P@$$wOrd123!',
   * });
   * ```
   */
  async signup(payload: SignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Signup.screenIdentifier, 'signup'],
    };
    await new FormHandler(options).submitData<SignupOptions>(payload);
  }

  /**
   * Handles the submission of the social signup form.
   *
   * @remarks
   * This method is similar to the {@link signup} method but is used for social signups.
   *
   * @param payload - The payload containing the social signup options.
   *
   * @example
   * ```typescript
   * import Signup from '@auth0/auth0-acul-js/signup';
   *
   * const signupManager = new Signup();
   *
   * signupManager.federatedSignup({
   *  connection: 'google-oauth2'
   * });
   * ```
   */

  async federatedSignup(payload: FederatedSignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Signup.screenIdentifier, 'federatedSignup'],
    };
    await new FormHandler(options).submitData<FederatedSignupOptions>(payload);
  }

  /**
   * @example
   * import Signup from "@auth0/auth0-acul-js/signup";
   * const signupManager = new Signup();
   *
   * signupManager.pickCountryCode();
   */
  async pickCountryCode(): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Signup.screenIdentifier, 'pickCountryCode'],
    };

    await new FormHandler(options).submitData({
      action: FormActions.PICK_COUNTRY_CODE,
    });
  }

/**
 * Validates a password string against the current transaction's password policy.
 *
 * This method retrieves the password policy from the current transaction context
 * and delegates the actual validation to `coreValidatePassword`.
 *
 * It returns an array of validation results, each containing:
 * - `code`: the identifier of the password rule,
 * - `policy`: a user-friendly description of the rule,
 * - `isValid`: boolean indicating if the password passed that rule.
 *
 * @param {string} password - The password string to validate.
 * @returns {PasswordRuleValidation[]} An array of rule validation results.
 *
 * @example
 * ```ts
 * const signup = new Signup();
 * const validationResults = signup.validatePassword('MyP@ssw0rd!');
 * console.log(validationResults);
 * // [
 * //   { code: 'password-policy-length-at-least', policy: 'At least 12 characters', isValid: false },
 * //   { code: 'password-policy-lower-case', policy: 'Lowercase letters (a-z)', isValid: true },
 * //   ...
 * // ]
 * ```
 */
  validatePassword(password: string): PasswordRuleValidation[] {
    const passwordPolicy = this.transaction?.passwordPolicy;
    return coreValidatePassword(password, passwordPolicy);
  }

  /**
   * Returns the list of enabled identifiers for the signup form,
   * marking each as required or optional based on transaction config.
   *
   * @returns Array of identifier objects (e.g., email, phone, username).
   *
   * @example
   * const signup = new Signup();
   * const identifiers = signup.getEnabledIdentifiers();
   * // [{ type: 'email', required: true }, { type: 'username', required: false }]
   */
  getEnabledIdentifiers(): Identifier[] | null { 
    const transaction = {
      ...this.transaction,
      errors: this.transaction.errors ?? undefined, // convert `null` to `undefined`
    };
    return coreGetIdentifier(transaction.requiredIdentifiers ?? [], transaction.optionalIdentifiers ?? [], transaction.connectionStrategy);
  }

  /**
   * Validates a given username against the current username policy
   * defined in the transaction context.
   *
   * @param username - The username string to validate.
   * @returns Result object indicating whether the username is valid and why.
   *
   * @example
   * const signup = new Signup();
   * const result = signup.validateUsername('myusername');
   * // result => { valid: true, errors: [] }
   */
  validateUsername(username: string): UsernameValidationResult {
    const usernameValidationConfig = this.transaction.usernamePolicy;
    return coreValidateUsername(username, usernameValidationConfig);
  }
}

export { PasswordRuleValidation, UsernameValidationResult, Identifier, SignupMembers, SignupOptions, ScreenOptions as ScreenMembersOnSignup, TransactionOptions as TransactionMembersOnSignup, FederatedSignupOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
