import { ScreenIds } from '../../constants';
import coreValidatePassword from '../../helpers/validatePassword';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { PasswordValidationResult } from '../../../interfaces/models/screen';
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

    if (payload.phone?.trim() ?? '') {
      const { phone, ...rest } = payload;
      payload = { ...rest, phone_number: phone };
    }

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
   * Validates a given password against the current password policy
   * defined in the transaction context.
   *
   * @param password - The password string to validate.
   * @returns Result object indicating whether the password is valid and why.
   *
   * @example
   * const signupPassword = new SignupPassword();
   * const result = signupPassword.validatePassword('MyP@ssw0rd');
   * // result => { valid: true, errors: [] }
   */
  validatePassword(password: string): PasswordValidationResult {
    const passwordPolicy = this.transaction?.passwordPolicy;
    return coreValidatePassword(password, passwordPolicy);
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
