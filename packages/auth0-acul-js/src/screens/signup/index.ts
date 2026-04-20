import { PasswordValidationResult } from '../../../interfaces/utils/validate-password';
import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { getSignupIdentifiers as _getSignupIdentifiers} from '../../utils/signup-identifiers';
import { validatePassword as _validatePassword} from '../../utils/validate-password';
import { validateUsername as _validateUsername} from '../../utils/validate-username';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupMembers,
  ScreenMembersOnSignup as ScreenOptions,
  SignupOptions,
  FederatedSignupOptions,
  TransactionMembersOnSignup as TransactionOptions,
} from '../../../interfaces/screens/signup';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { Identifier } from '../../../interfaces/utils/signup-identifiers';
import type { UsernameValidationResult } from '../../../interfaces/utils/validate-username';

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
   * @param password 
   * @returns An object of type {@link PasswordValidationResult} indicating whether the password is valid and why.
   * @utilityFeature
   */
  validatePassword(password: string): PasswordValidationResult {
    const passwordPolicy = this.transaction?.passwordPolicy;
    return _validatePassword(password, passwordPolicy);
  }

  /**
   * Returns the list of enabled identifiers for the signup form,
   * marking each as required or optional based on transaction config.
   *
   * @returns Array of identifier objects (e.g., email, phone, username).
   * @utilityFeature
   * @example
   * const signup = new Signup();
   * const identifiers = signup.getSignupIdentifiers();
   * // [{ type: 'email', required: true }, { type: 'username', required: false }]
   */
  getSignupIdentifiers(): Identifier[] | null { 
    const transaction = {
      ...this.transaction,
      errors: this.transaction.errors ?? undefined, // convert `null` to `undefined`
    };
    return _getSignupIdentifiers(transaction.requiredIdentifiers ?? [], transaction.optionalIdentifiers ?? [], transaction.connectionStrategy);
  }

  /**
   * Validates a given username against the current username policy
   * defined in the transaction context.
   *
   * @param username - The username string to validate.
   * @returns Result object indicating whether the username is valid and why.
   * @utilityFeature
   *
   * @example
   * const signup = new Signup();
   * const result = signup.validateUsername('myusername');
   * // result => { valid: true, errors: [] }
   */
  validateUsername(username: string): UsernameValidationResult {
    const usernameValidationConfig = this.transaction.usernamePolicy;
    return _validateUsername(username, usernameValidationConfig);
  }
}

export { PasswordValidationResult, UsernameValidationResult, Identifier, SignupMembers, SignupOptions, ScreenOptions as ScreenMembersOnSignup, TransactionOptions as TransactionMembersOnSignup, FederatedSignupOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
