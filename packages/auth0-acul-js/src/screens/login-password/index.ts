import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { getBrowserCapabilities } from '../../utils/browser-capabilities';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ScreenMembersOnLoginPassword as ScreenOptions,
  LoginPasswordOptions,
  LoginPasswordMembers,
  FederatedLoginOptions,
  SwitchConnectionOptions,
  TransactionMembersOnLoginPassword as TransactionOptions,
} from '../../../interfaces/screens/login-password';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class LoginPassword extends BaseContext implements LoginPasswordMembers {
  static screenIdentifier: string = ScreenIds.LOGIN_PASSWORD;
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
    const options: FormOptions = { state: this.transaction.state, telemetry: [LoginPassword.screenIdentifier, 'login'] };
    const browserCapabilities = await getBrowserCapabilities();
    await new FormHandler(options).submitData<LoginPasswordOptions>({
      ...payload,
      ...browserCapabilities,
    });
  }

  /**
     * @example
     * import LoginPassword from "@auth0/auth0-acul-js/login-id";
     * const loginIdManager = new LoginPassword();
     *
     * // Check if alternateConnections is available and has at least one item
     * if (!loginIdManager.transaction.alternateConnections) {
     *   console.error('No alternate connections available.');
     * }
     *
     * // Select the first available connection (users can select any available connection)
     * const selectedConnection = alternateConnections[0];
     *
     * // Log the chosen connection for debugging or informational purposes
     * console.log(`Selected connection: ${selectedConnection.name}`);
     *
     * // Proceed with federated login using the selected connection
     * loginIdManager.federatedLogin({
     *   connection: selectedConnection.name,
     * });
     */
  async federatedLogin(payload: FederatedLoginOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPassword.screenIdentifier, 'federatedLogin'],
    };

    await new FormHandler(options).submitData<FederatedLoginOptions>(payload);
  }

  /**
   * @remarks
   * This method handles switching between DB connection (password) and Passwordless connection (Email/SMS OTP).
   * The connection parameter should be one of: 'email', 'sms', or a DB connection name.
   *
   * @example
   * import LoginPassword from "@auth0/auth0-acul-js/login-password";
   *
   * const loginPasswordManager = new LoginPassword();
   *
   * // Switch to passwordless email
   * loginPasswordManager.switchConnection({
   *   connection: "email"
   * });
   *
   * // Switch to passwordless SMS
   * loginPasswordManager.switchConnection({
   *   connection: "sms"
   * });
   */
  async switchConnection(payload: SwitchConnectionOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPassword.screenIdentifier, 'switchConnection'],
    };

    await new FormHandler(options).submitData<SwitchConnectionOptions>(payload);
  }
}

export {
  LoginPasswordMembers,
  LoginPasswordOptions,
  FederatedLoginOptions,
  SwitchConnectionOptions,
  ScreenOptions as ScreenMembersOnLoginPassword,
  TransactionOptions as TransactionMembersOnLoginPassword,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
