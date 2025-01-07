import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupIdMembers,
  ScreenMembersOnSignupId as ScreenOptions,
  TransactionMembersOnSignupId as TransactionOptions,
  SignupOptions,
  SocialSignupOptions,
} from '../../../interfaces/screens/signup-id';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

export default class SignupId extends BaseContext implements SignupIdMembers {
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

    await new FormHandler(options).submitData<SignupOptions>(payload);
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
   * signupIdManager.socialSignup(signupParams);
   */
  async socialSignup(payload: SocialSignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SocialSignupOptions>(payload);
  }
}

export {
  SignupIdMembers,
  SignupOptions,
  SocialSignupOptions
}
