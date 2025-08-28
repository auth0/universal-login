import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { validatePassword as _validatePassword} from '../../utils/validate-password';


import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupPasswordMembers,
  ScreenContextOnSignupPassword,
  ScreenMembersOnSignupPassword as ScreenOptions,
  TransactionMembersOnSignupPassword as TransactionOptions,
  SignupPasswordOptions,
  FederatedSignupOptions
} from '../../../interfaces/screens/signup-password';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { PasswordValidationResult } from '../../../interfaces/utils/validate-password';

export default class SignupPassword extends BaseContext implements SignupPasswordMembers {
  static screenIdentifier: string = ScreenIds.SIGNUP_PASSWORD;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContextOnSignupPassword;
    const transactionContext = this.getContext('transaction') as TransactionContext;

    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * @remarks
   * This methods handles signup-password related screen configuration.
   * It allows to proceed with registering signup password along with signup identifiers passed in previous screen
   *
   * @example
   * import SignupPassword from "@auth0/auth0-acul-js/signup-password";
   *
   * const signupPasswordManager = new SignupPassword();
   * const { transaction, screen } = signupPasswordManager;
   *
   * //get mandatory & optional identifiers required for signup-password screen to proceed
   * const mandatoryIdentifier = transaction.getRequiredIdentifiers(); //eg: email
   * const optionalIdentifiers = transaction.getOptionalIdentifiers() //eg: phone
   *
   * //get signup data submitted on previous screen from previous screen
   * const data = transaction.screen.getScreenData(); //eg: email, phone
   *
   *
   * const signupParams = {
   *  email : data.email,
   *  password: "******"
   * };
   *
   * signupPasswordManager.signup(signupParams);
   */
  async signup(payload: SignupPasswordOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [this.constructor.name, 'signup'],
    };

    await new FormHandler(options).submitData<SignupPasswordOptions>(payload);
  }

  /**
   * @remarks
   * This methods handles allows signup via different social identifiers.
   * Eg: Google, Facebook etc.
   *
   * @example
   * import SignupPassword from "@auth0/auth0-acul-js/signup-id";
   *
   * const signupIdManager = new SignupPassword();
   * const { transaction } = signupIdManager;
   *
   * //get social connections
   * const socialConnection = transaction.getAlternateConnections(); //eg: "google-oauth2"
   *
   * const signupParams = {
   *  connection : socialConnection[0].name, // "google-oauth2"
   * };
   *
   * signupIdManager.federatedSignup(signupParams);
   */
  async federatedSignup(payload: FederatedSignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [SignupPassword.screenIdentifier, 'federatedSignup'],
    };

    await new FormHandler(options).submitData<FederatedSignupOptions>(payload);
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
  * @returns {PasswordValidationResult}
  * @utilityFeature
  *
  * @example
  * ```ts
  * import SignupPassword from "@auth0/auth0-acul-js/signup-password";
  * const signupPasswordManager = new SignupPassword();
  * const validationResults = signupPasswordManager.validatePassword('MyP@ssw0rd!');
  * console.log(validationResults);
  * // [
  * //   { code: 'password-policy-length-at-least', policy: 'At least 12 characters', isValid: false },
  * //   { code: 'password-policy-lower-case', policy: 'Lowercase letters (a-z)', isValid: true },
  * //   ...
  * // ]
  * ```
  */
  validatePassword(password: string): PasswordValidationResult {
    const passwordPolicy = this.transaction?.passwordPolicy;
    return _validatePassword(password, passwordPolicy);
  }
}

export {
  SignupPasswordMembers,
  SignupPasswordOptions,
  FederatedSignupOptions,
  ScreenOptions as ScreenMembersOnSignupPassword,
  TransactionOptions as TransactionMembersOnSignupPassword,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
