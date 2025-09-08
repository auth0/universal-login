import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { getBrowserCapabilities } from '../../utils/browser-capabilities';
import { FormHandler } from '../../utils/form-handler';
import { getPasskeyCredentials } from '../../utils/passkeys';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ScreenMembersOnLoginId as ScreenOptions,
  TransactionMembersOnLoginId as TransactionOptions,
  LoginIdMembers,
  LoginOptions,
  FederatedLoginOptions,
} from '../../../interfaces/screens/login-id';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class LoginId extends BaseContext implements LoginIdMembers {
  static screenIdentifier: string = ScreenIds.LOGIN_ID;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  /**
   * Creates an instance of LoginIdManager.
   */
  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;

    // Add the properties specific to the prompt.
    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * @example
   *
   * import LoginId from "@auth0/auth0-acul-js/login-id";
   *
   * const loginIdManager = new LoginId();
   *
   * loginIdManager.login({
   *   username: <usernameFieldValue>
   * });
   */
  async login(payload: LoginOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginId.screenIdentifier, 'login'],
    };

    const browserCapabilities = await getBrowserCapabilities();
    await new FormHandler(options).submitData<LoginOptions>({
      ...payload,
      ...browserCapabilities
    });
  }

  /**
   * @example
   * import LoginId from "@auth0/auth0-acul-js/login-id";
   * const loginIdManager = new LoginId();
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
      telemetry: [LoginId.screenIdentifier, 'federatedLogin'],
    };

    await new FormHandler(options).submitData<FederatedLoginOptions>(payload);
  }

  /**
   * @example
   * import LoginId from "@auth0/auth0-acul-js/login-id";
   * const loginIdManager = new LoginId();
   *
   * // It internally maps users available passkey config provided from auth0 server
   * loginIdManager.passkeyLogin();
   */
  async passkeyLogin(payload?: CustomOptions): Promise<void> {
    const publicKey = this.screen.publicKey;
    if (!publicKey) throw new Error(Errors.PASSKEY_DATA_UNAVAILABLE);

    const passkey = await getPasskeyCredentials(publicKey);
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginId.screenIdentifier, 'passkeyLogin'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      passkey: JSON.stringify(passkey),
    });
  }

  /**
   * @example
   * import LoginId from "@auth0/auth0-acul-js/login-id";
   * const loginIdManager = new LoginId();
   *
   * loginIdManager.pickCountryCode();
   */
  async pickCountryCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginId.screenIdentifier, 'pickCountryCode'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_COUNTRY_CODE,
    });
  }

  /**
   * Gets the active identifier types for the login screen
   * @returns An array of active identifier types or null if none are active
   * @example
   * ```typescript
   * import LoginId from "@auth0/auth0-acul-js/login";
   * const loginIdManager = new LoginId();
   * loginIdManager.getActiveIdentifiers();
   * ```
   */
  getActiveIdentifiers(): string[] | null {
    return this.transaction.allowedIdentifiers;
  }
}

export {
  LoginIdMembers,
  LoginOptions,
  FederatedLoginOptions,
  ScreenOptions as ScreenMembersOnLoginId,
  TransactionOptions as TransactionMembersOnLoginId,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
export * from '../../utils/errors'
