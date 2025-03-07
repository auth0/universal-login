import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  SignupMembers,
  ScreenMembersOnSignup as ScreenOptions,
  SignupOptions,
  SocialSignupOptions,
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
   * signupManager.socialSignup({
   *  connection: 'google-oauth2'
   * });
   * ```
   */
  async socialSignup(payload: SocialSignupOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SocialSignupOptions>(payload);
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
    };

    await new FormHandler(options).submitData({
      action: 'pick-country-code',
    });
  }
}

export { SignupMembers, SignupOptions, ScreenOptions as ScreenMembersOnSignup, TransactionOptions as TransactionMembersOnSignup };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
