import { FormActions } from '../constants';
import { Branding, Client, Prompt, Screen, Organization, User, Transaction, Tenant, UntrustedData } from '../models';
import { FormHandler } from '../utils/form-handler';

import type { LanguageChangeOptions } from '../../interfaces/common';
import type {
  ClientMembers,
  PromptMembers,
  ScreenMembers,
  OrganizationMembers,
  UserMembers,
  TransactionMembers,
  TenantMembers,
  UntrustedDataMembers,
  BrandingMembers
} from '../../interfaces/models';
import type { BaseContext as UniversalLoginContext, BaseMembers } from '../../interfaces/models/base-context';
import type { Error as TransactionError } from '../../interfaces/models/transaction';
import type { FormOptions } from '../../interfaces/utils/form-handler';

/**
 * @class BaseContext
 * @description Foundation class that provides access to the Universal Login Context, which contains all information
 * about the current authentication flow, including user data, client information, and screen configuration.
 */
export class BaseContext implements BaseMembers {
  branding: BrandingMembers;
  screen: ScreenMembers;
  tenant: TenantMembers;
  prompt: PromptMembers;
  organization: OrganizationMembers;
  client: ClientMembers;
  transaction: TransactionMembers;
  user: UserMembers;
  untrustedData: UntrustedDataMembers;

  private static context: UniversalLoginContext | null = null;

  /**
   * @property {string} screenIdentifier - Identifier for the current screen, used to verify correct screen imports
   */
  static screenIdentifier: string = '';

  /**
   * @constructor
   * @description Initializes a new instance of the BaseContext class and populates its properties with data from the Universal Login Context.
   * @throws {Error} If Universal Login Context is not available or screen identifier doesn't match.
   */
  constructor() {
    if (!BaseContext.context) {
      const globalWindow = window as unknown as { universal_login_context?: UniversalLoginContext };
      BaseContext.context = globalWindow.universal_login_context ?? null;
    }

    const context = BaseContext.context;
    const screenIdentifier: string = new.target?.screenIdentifier;

    if (!context) {
      throw new Error('Universal Login Context is not available on the global window object.');
    }

    if (screenIdentifier !== context?.screen?.name && screenIdentifier !== '') {
      throw new Error(
        `Incorrect import: The current screen name does not match the imported screen class. Imported Screen: ${screenIdentifier}, Current Screen: ${context?.screen?.name}`,
      );
    }

    this.branding = new Branding(context.branding);
    this.screen = new Screen(context.screen);
    this.tenant = new Tenant(context.tenant);
    this.prompt = new Prompt(context.prompt);
    this.organization = new Organization(context.organization);
    this.client = new Client(context.client);
    this.transaction = new Transaction(context.transaction);
    this.user = new User(context.user);
    this.untrustedData = new UntrustedData(context.untrusted_data);
  }

  /**
   * Retrieves a specific part of the Universal Login Context.
   * @template K - The key type of the UniversalLoginContext
   * @param {K} model - The key of the context to retrieve
   * @returns {UniversalLoginContext[K] | undefined} The requested context portion or undefined if not available
   * @ignore - Internal method not intended for public use
   */
  getContext<K extends keyof UniversalLoginContext>(model: K): UniversalLoginContext[K] | undefined {
    if (!BaseContext.context) {
      const globalWindow = window as unknown as { universal_login_context?: UniversalLoginContext };
      BaseContext.context = globalWindow.universal_login_context ?? null;
    }

    if (!BaseContext.context) {
      return undefined;
    }

    return BaseContext.context[model];
  }

  /**
  * Retrieves the array of transaction errors from the context, or an empty array if none exist.
  * @returns {TransactionError[]} An array of error objects from the transaction context.
  */
  getErrors(): TransactionError[] {
    return this.transaction?.errors ?? [];
  }

  /**
   * Changes the language/locale for the current authentication flow.
   * 
   * This method triggers a language change by submitting the new locale preference
   * to the server with the 'change-language' action. The language change will cause
   * the current screen to re-render with the new locale.
   * 
   * @param options - Language change options including the target language code
   * @param options.language - Short language name (locale code) to be set (e.g., 'en', 'fr', 'es')
   * @param options.persist - Persistence scope for the language preference (defaults to 'session')
   * 
   * @returns A promise that resolves when the form submission is complete
   * 
   * @example
   * ```typescript
   * import LoginId from "@auth0/auth0-acul-js/login-id";
   * 
   * const loginManager = new LoginId();
   * 
   * // Change language to French
   * await loginManager.changeLanguage({
   *   language: 'fr',
   *   persist: 'session'
   * });
   * ```
   * 
   * @example
   * ```typescript
   * import LoginPassword from "@auth0/auth0-acul-js/login-password";
   * 
   * const loginPasswordManager = new LoginPassword();
   * 
   * // Change language to Spanish with additional custom data
   * await loginPasswordManager.changeLanguage({
   *   language: 'es',
   *   persist: 'session',
   *   'ulp-custom-field': 'custom-value'
   * });
   * ```
   * 
   * @remarks
   * - This method is available on all screen instances that extend BaseContext
   * - The language must be one of the enabled locales configured in your Auth0 tenant
   * - The screen will automatically re-render with the new language after submission
   * - Custom fields can be included and will be accessible in the Post Login Trigger
   * 
   * @category Language
   * @utilityFeature
   */
  async changeLanguage(options: LanguageChangeOptions): Promise<void> {
    const screenIdentifier = (this.constructor as typeof BaseContext).screenIdentifier;
    const formOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [screenIdentifier, 'changeLanguage'],
    };

    await new FormHandler(formOptions).submitData<LanguageChangeOptions>({
      ...options,
      action: FormActions.CHANGE_LANGUAGE,
    });
  }
}
