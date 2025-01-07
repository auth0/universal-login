import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ScreenMembersOnLoginPassword as ScreenOptions,
  LoginPasswordOptions,
  LoginPasswordMembers,
  TransactionMembersOnLoginPassword as TransactionOptions,
} from '../../../interfaces/screens/login-password';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

export default class LoginPassword extends BaseContext implements LoginPasswordMembers {
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
   * This methods handles login-password related configuration.
   *
   * @example
   * import LoginPassword from "@auth0/auth0-acul-js/login-password";
   *
   * const loginPasswordManager = new LoginPassword();
   * loginPasswordManager.login({
   *  username: "testUser",
   *  password: "******"
   * });
   */
  async login(payload: LoginPasswordOptions): Promise<void> {
    const options: FormOptions = { state: this.transaction.state };
    await new FormHandler(options).submitData<LoginPasswordOptions>(payload);
  }
}

export {
  LoginPasswordMembers,
  LoginPasswordOptions
}
