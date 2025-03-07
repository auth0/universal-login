import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ScreenMembersOnLogin as ScreenOptions,
  LoginOptions,
  LoginMembers,
  TransactionMembersOnLogin as TransactionOptions,
  SocialLoginOptions,
} from '../../../interfaces/screens/login';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Login screen implementation class
 */
export default class Login extends BaseContext implements LoginMembers {
  static screenIdentifier: string = ScreenIds.LOGIN;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  /**
   * Creates an instance of Login screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;
    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * Performs login with username/password
   * @param payload The login options containing username and password
   * @example
   * ```typescript
   * import Login from "@auth0/auth0-acul-js/login";
   *
   * const loginManager = new Login();
   * loginManager.login({
   *   username: "testUser",
   *   password: "testPassword"
   * });
   * ```
   */
  async login(payload: LoginOptions): Promise<void> {
    const options: FormOptions = { state: this.transaction.state };
    await new FormHandler(options).submitData<LoginOptions>(payload);
  }

  /**
   * Performs login with social provider
   * @param payload The social login options containing connection name
   * @example
   * ```typescript
   * import Login from "@auth0/auth0-acul-js/login";
   *
   * const loginManager = new Login();
   * loginManager.socialLogin({
   *   connection: "google-oauth2"
   * });
   * ```
   */
  async socialLogin(payload: SocialLoginOptions): Promise<void> {
    const options: FormOptions = { state: this.transaction.state };
    await new FormHandler(options).submitData<SocialLoginOptions>(payload);
  }
}

export { LoginMembers, LoginOptions, SocialLoginOptions, ScreenOptions as ScreenMembersOnLogin, TransactionOptions as TransactionMembersOnLogin };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
