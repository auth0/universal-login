import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { getBrowserCapabilities } from '../../utils/browser-capabilities';
import { FormHandler } from '../../utils/form-handler';
import { getEnabledIdentifiers as _getEnabledIdentifiers} from '../../utils/get-enabled-identifiers';
import { validateUsername as _validateUsername} from '../../utils/validate-username';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { UsernameValidationResult } from '../../../interfaces/utils/validate-username';
import type { Identifier } from '../../../interfaces/utils/get-enabled-identifiers';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupIdMembers,
  ScreenMembersOnSignupId as ScreenOptions,
  TransactionMembersOnSignupId as TransactionOptions,
  SignupOptions,
  FederatedSignupOptions,
} from '../../../interfaces/screens/signup-id';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class SignupId extends BaseContext implements SignupIdMembers {
  static screenIdentifier: string = ScreenIds.SIGNUP_ID;
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
   * This methods handles signup-id related configuration.
   * It allows to signup new users via different identifiers.
   *
   * @example
   * import SignupId from "@auth0/auth0-acul-js/signup-id";
   *
   * const signupIdManager = new SignupId();
   * const { transaction } = signupIdManager;
   *
   * //get mandatory & optional identifiers required for signup
   * const mandatoryIdentifier = transaction.getRequiredIdentifiers(); // eg: email
   * const optionalIdentifiers = transaction.getOptionalIdentifiers() // eg: phone
   *
   * const signupParams = {
   *  email : "testEmail",
   *  phone : "+91923456789"
   * };
   *
   * signupIdManager.signup(signupParams);
   */
  async signup(payload: SignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [SignupId.screenIdentifier, 'signup'],
    };

    const activeIdentifiers = this.transaction.requiredIdentifiers || [];
    const missingParameters = activeIdentifiers.filter((param) => !Object.keys(payload).includes(param));
    if (missingParameters.length) {
      throw new Error(`Missing parameter(s): ${missingParameters.join(', ')}`);
    }

    if (payload.phone?.trim() ?? '') {
      const { phone, ...rest } = payload;
      payload = { ...rest, phone_number: phone };
    }

    const browserCapabilities = await getBrowserCapabilities()
    await new FormHandler(options).submitData<SignupOptions>({
      ...payload,
      ...browserCapabilities
    });
  }

  /**
   * @remarks
   * This methods handles allows signup via different social identifiers.
   * Eg: Google, Facebook etc.
   *
   * @example
   * import SignupId from "@auth0/auth0-acul-js/signup-id";
   *
   * const signupIdManager = new SignupId();
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
      telemetry: [SignupId.screenIdentifier, 'federatedSignup'],
    };
    await new FormHandler(options).submitData<FederatedSignupOptions>(payload);
  }

  /**
   * Returns the list of enabled identifiers for the signup-id form,
   * marking each as required or optional based on transaction config.
   *
   * @returns Array of identifier objects (e.g., email, phone, username).
   *
   * @example
   * const signupId = new SignupId();
   * const identifiers = signupId.getEnabledIdentifiers();
   * // [{ type: 'email', required: true }, { type: 'username', required: false }]
   */
  getEnabledIdentifiers(): Identifier[] | null {
    const transaction = {
      ...this.transaction,
      errors: this.transaction.errors ?? undefined, // convert `null` to `undefined`
    };
    return _getEnabledIdentifiers(transaction.requiredIdentifiers ?? [], transaction.optionalIdentifiers ?? [], transaction.connectionStrategy);
  }
  
  /**
   * @example
   * import SignupId from "@auth0/auth0-acul-js/signup-id";
   * const signupIdManager = new SignupId();
   *
   * signupIdManager.pickCountryCode();
   */
  async pickCountryCode(): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [SignupId.screenIdentifier, 'pickCountryCode'],
    };

    await new FormHandler(options).submitData({
      action: FormActions.PICK_COUNTRY_CODE,
    });
  }

  /**
     * Validates a given username against the current username policy
     * defined in the transaction context.
     *
     * @param username - The username string to validate.
     * @returns Result object indicating whether the username is valid and why.
     *
     * @example
     * const signupIdManager = new SignupId();
     * const result = signupIdManager.validateUsername('myusername');
     * // result => { valid: true, errors: [] }
     */
    validateUsername(username: string): UsernameValidationResult {
      const usernameValidationConfig = this.transaction.usernamePolicy;
      return _validateUsername(username, usernameValidationConfig);
    }
}

export {
  SignupIdMembers,
  Identifier,
  UsernameValidationResult,
  SignupOptions,
  FederatedSignupOptions,
  ScreenOptions as ScreenMembersOnSignupId,
  TransactionOptions as TransactionMembersOnSignupId,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
