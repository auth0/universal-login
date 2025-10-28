import { ScreenIds, FormActions, Errors } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { getBrowserCapabilities } from '../../utils/browser-capabilities';
import { SDKUsageError } from '../../utils/errors';
import { FormHandler } from '../../utils/form-handler';
import { getLoginIdentifiers as _getLoginIdentifiers } from '../../utils/login-identifiers';
import { getPasskeyCredentials } from '../../utils/passkeys';
import { registerPasskeyAutofill } from '../../utils/passkeys';

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
import type { IdentifierType } from 'interfaces/utils';

export default class LoginId extends BaseContext implements LoginIdMembers {
  static screenIdentifier: string = ScreenIds.LOGIN_ID;
  #passkeyController?: AbortController;
  #isConditionalUIRegistered = false;
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
    this.#passkeyController?.abort();
    this.#passkeyController = undefined;

    const publicKey = this.screen.publicKey;
    if (!publicKey) throw new Error(Errors.PASSKEY_DATA_UNAVAILABLE);

    try {
      const passkey = await getPasskeyCredentials(publicKey);
      const options: FormOptions = {
        state: this.transaction.state,
        telemetry: [LoginId.screenIdentifier, 'passkeyLogin'],
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
      throw err; // rethrow only unexpected errors
    }
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
   * loginIdManager.getLoginIdentifiers();
   * ```
   * @utilityFeature
   */
  getLoginIdentifiers(): IdentifierType[] | null {
    return _getLoginIdentifiers(this.transaction.allowedIdentifiers);
  }

  /**
   * Registers the browser's Conditional UI for passkeys (autocomplete experience).
   *
   * This method initializes a passive WebAuthn credential request using
   * `navigator.credentials.get()` with `mediation: "conditional"`. When supported,
   * this allows the browser to display stored passkeys directly within the username
   * field’s autocomplete dropdown.
   *
   * Call this **once** when the login screen is initialized (for example, on page load).
   * After registration, focusing the username input will automatically display
   * matching passkeys as suggestions. Selecting a passkey completes authentication
   * without requiring additional user interaction.
   *
   * ---
   * ### Input configuration
   * If an `inputId` is provided, the SDK will:
   * - Validate that the element exists and is an `<input>`.
   * - Overwrite its `autocomplete` attribute with `"webauthn username"`.
   *
   * This ensures full compatibility with the Conditional Mediation API.
   *
   * If you do **not** provide an `inputId`, you are responsible for configuring
   * the input element manually with the correct attributes:
   *
   * ```html
   * <input id="username" autocomplete="webauthn username" />
   * ```
   *
   * ---
   * ### Gotchas
   * - The `autocomplete` attribute **must exactly** contain `"webauthn username"`.
   *   Including unrelated tokens such as `"email"` or `"text"` will prevent browsers
   *   from showing the passkey dropdown.
   * - Overwriting the attribute is intentional and required for consistent behavior
   *   across browsers. Do not rely on merging or extending existing autocomplete values.
   * - If Conditional Mediation is not supported by the browser, the SDK will safely no-op.
   *
   * ---
   * @param inputId - Optional ID of the username `<input>` element (without `#`). Example: `"username"`.
   * If omitted, the developer must manually ensure the correct `autocomplete` attributes.
   *
   * @example
   * ```ts
   * import LoginId from '@auth0/auth0-acul-js/login-id';
   *
   * // Example: initializing passkey autocomplete inside an async setup block.
   * async function initializeLogin() {
   *   const loginId = new LoginId();
   *   // Make sure associated HTML input exists:
   *   // <input id="username" autocomplete="webauthn username" />
   *   // Conditional UI registration.
   *   await loginId.registerPasskeyAutofill('username');
   * }
   *
   * initializeLogin().catch(console.error);
   * ```
   *
   * @remarks
   * This method delegates to the internal `registerPasskeyAutofill()` utility,
   * returning a background `AbortController` to manage request lifetime. It should
   * only be invoked once per page lifecycle.
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
      onResolve: async (cred) => {
        const options: FormOptions = {
          state: this.transaction.state,
          telemetry: [LoginId.screenIdentifier, 'passkeyAutocomplete'],
        };
        await new FormHandler(options).submitData({
          passkey: JSON.stringify(cred),
        });
      },
      onReject: (err) => {
        console.warn('Passkey autocomplete registration failed', err);
        throw new SDKUsageError(Errors.PASSKEY_AUTOCOMPLETE_REGISTRATION_FAILED);
      },
    }) ?? undefined;

    this.#isConditionalUIRegistered = true;
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
