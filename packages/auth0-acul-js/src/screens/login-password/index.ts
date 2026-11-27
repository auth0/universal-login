import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { getBrowserCapabilities } from '../../utils/browser-capabilities';
import { ConfigurationError } from '../../utils/errors';
import { FormHandler } from '../../utils/form-handler';
import { getPasskeyCredentials, registerPasskeyAutofill } from '../../utils/passkeys';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { CustomOptions } from '../../../interfaces/common';
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
  #passkeyController?: AbortController;
  #isConditionalUIRegistered = false;
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
   * // Function to handle connection switching
   * const handleSwitchConnection = (connectionName: string) => {
   *   loginPasswordManager.switchConnection({ connection: connectionName });
   * };
   *
   * // Switch to different connection strategies
   * handleSwitchConnection('email'); // Switch to email-based authentication
   * handleSwitchConnection('sms');   // Switch to SMS-based authentication
   */
  async switchConnection(payload: SwitchConnectionOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPassword.screenIdentifier, 'switchConnection'],
    };

    await new FormHandler(options).submitData<SwitchConnectionOptions>(payload);
  }

  /**
   * @remarks
   * Switches the authentication flow from password-based to OTP (one-time password) authentication.
   *
   * @example
   * import LoginPassword from "@auth0/auth0-acul-js/login-password";
   *
   * const loginPasswordManager = new LoginPassword();
   * loginPasswordManager.switchToOtp();
   */
  async switchToOtp(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPassword.screenIdentifier, 'switchToOtp'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.SWITCH_TO_OTP_AUTH,
    });
  }

  /**
   * @remarks
   * Signs the user in with a passkey instead of their password. The passkey challenge is only
   * present when the server offers passkeys on this screen, so check `screen.publicKey` before
   * rendering a passkey button.
   *
   * @example
   * import LoginPassword from "@auth0/auth0-acul-js/login-password";
   *
   * const loginPasswordManager = new LoginPassword();
   *
   * if (loginPasswordManager.screen.publicKey) {
   *   loginPasswordManager.passkeyLogin();
   * }
   */
  async passkeyLogin(payload?: CustomOptions): Promise<void> {
    this.#passkeyController?.abort();
    this.#passkeyController = undefined;

    const publicKey = this.screen.publicKey;
    if (!publicKey) throw new Error(Errors.PASSKEY_DATA_UNAVAILABLE);

    try {
      const passkey = await getPasskeyCredentials(publicKey);
      const options: FormOptions = {
        state: this.transaction.state,
        telemetry: [LoginPassword.screenIdentifier, 'passkeyLogin'],
      };

      await new FormHandler(options).submitData<CustomOptions>({
        ...payload,
        passkey: JSON.stringify(passkey),
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        // User cancelled or timed out the prompt
        if (this.#isConditionalUIRegistered) {
          try {
            await this.registerPasskeyAutofill();
          } catch (e) {
            console.warn('Conditional UI restart failed', e);
          }
        }
        return;
      }
      throw err;
    }
  }

  /**
   * Registers the browser's Conditional UI for passkeys on the password field, so stored
   * passkeys appear in the password input's autocomplete dropdown.
   *
   * Call this **once** when the screen is initialized, and only when `screen.publicKey` is
   * present and `transaction.showPasskeyAutofill` is `true`.
   *
   * If an `inputId` is provided, the SDK overwrites that input's `autocomplete` attribute with
   * `"current-password webauthn"`. Otherwise, set it yourself:
   *
   * ```html
   * <input id="password" type="password" autocomplete="current-password webauthn" />
   * ```
   *
   * If Conditional Mediation is not supported by the browser, the SDK will safely no-op.
   *
   * @param inputId - Optional ID of the password `<input>` element (without `#`).
   *
   * @example
   * ```ts
   * import LoginPassword from '@auth0/auth0-acul-js/login-password';
   *
   * const loginPassword = new LoginPassword();
   *
   * if (loginPassword.screen.publicKey && loginPassword.transaction.showPasskeyAutofill) {
   *   await loginPassword.registerPasskeyAutofill('password');
   * }
   * ```
   *
   * @category Passkeys
   * @utilityFeature
   */
  async registerPasskeyAutofill(inputId?: string): Promise<void> {
    const publicKey = this.screen.publicKey;
    if (!publicKey) throw new Error(Errors.PASSKEY_DATA_UNAVAILABLE);

    this.#passkeyController = await registerPasskeyAutofill({
      publicKey,
      inputId,
      autocomplete: 'current-password webauthn',
      onResolve: async (cred) => {
        const options: FormOptions = {
          state: this.transaction.state,
          telemetry: [LoginPassword.screenIdentifier, 'passkeyAutocomplete'],
        };
        await new FormHandler(options).submitData({
          passkey: JSON.stringify(cred),
        });
      },
      onReject: (err) => {
        console.warn('Passkey autocomplete registration failed', err);
        throw new ConfigurationError(Errors.PASSKEY_AUTOCOMPLETE_REGISTRATION_FAILED);
      },
    }) ?? undefined;

    this.#isConditionalUIRegistered = true;
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
