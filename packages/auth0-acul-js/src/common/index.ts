import { BaseContext } from '../models/base-context';
import { Branding } from '../models/branding';
import { flattenColors, flattenFonts, flattenBorders, flattenPageBackground, flattenWidget } from '../utils/branding-theme';

import type { CurrentScreenOptions, LanguageChangeOptions } from '../../interfaces/common';
import type { FlattenedTheme } from '../../interfaces/common';
import type { Error as TransactionError } from '../../interfaces/models/transaction';

/**
 * Gets the current screen name from the authentication context
 * @commonFeature
 * @returns The current screen name or null if no screen is active
 */
export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}

/**
 * Gets the current screen options including client, organization, prompt, screen, tenant, transaction, and untrusted data
 * @commonFeature
 * @returns Current screen options object with all available context data
 */
export function getCurrentScreenOptions(): CurrentScreenOptions {
  const context = new BaseContext();

  const client = context.getContext('client');
  const org = context.getContext('organization');
  const prompt = context.getContext('prompt');
  const screen = context.getContext('screen');
  const tenant = context.getContext('tenant');
  const transaction = context.getContext('transaction');
  const untrustedData = context.getContext('untrusted_data');

  return {
    client: client ? { id: client.id, metadata: client.metadata ?? null } : null,
    organization: org ? { id: org.id, metadata: org.metadata ?? null } : null,
    prompt: prompt ? { name: prompt.name } : null,
    screen: screen ? { name: screen.name } : null,
    tenant: tenant ? { enabledLocales: tenant.enabled_locales ?? [] } : null,
    transaction: transaction
      ? {
        errors: (transaction.errors as TransactionError[]) ?? null,
        state: transaction.state,
        locale: transaction.locale,
      }
      : null,
    untrustedData: untrustedData
      ? { authorizationParams: untrustedData.authorization_params ?? null }
      : null,
  };
}

/**
 * Gets the current theme options with flattened configuration from branding context
 * @commonFeature
 * @returns FlattenedTheme object containing colors, fonts, borders, pageBackground, and widget configurations, or null if no branding is available
 */
export const getCurrentThemeOptions = (): FlattenedTheme | null => {
  const context = new BaseContext();
  const branding = context.getContext('branding');

  if (!branding) {
    return null;
  }

  const settings = Branding.getSettings(branding);
  const themes = Branding.getThemes(branding);

  if (!themes?.default) {
    return null;
  }

  return {
    colors: flattenColors(themes.default.colors, settings?.colors),
    fonts: flattenFonts(themes.default.fonts),
    borders: flattenBorders(themes.default.borders),
    pageBackground: flattenPageBackground(themes.default.pageBackground, settings?.colors?.pageBackground),
    widget: flattenWidget(themes.default.widget),
  };
};

/**
 * Gets the current errors from the transaction context
 * @commonFeature
 * @returns Array of Error objects or null if no errors are present
 */
export function getErrors(): TransactionError[] | null {
  const context = new BaseContext();
  const transaction = context.getContext('transaction');

  return (transaction?.errors as TransactionError[]) ?? null;
}

/**
 * Changes the language/locale for the current authentication flow.
 * 
 * This function triggers a language change by submitting the new locale preference
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
 * import { changeLanguage } from "@auth0/auth0-acul-js";
 * 
 * // Change language to French
 * await changeLanguage({
 *   language: 'fr',
 *   persist: 'session'
 * });
 * ```
 * 
 * @example
 * ```typescript
 * import { changeLanguage } from "@auth0/auth0-acul-js";
 * 
 * // Change language to Spanish with additional custom data
 * await changeLanguage({
 *   language: 'es',
 *   persist: 'session',
 *   'ulp-custom-field': 'custom-value'
 * });
 * ```
 * 
 * @remarks
 * - The language must be one of the enabled locales configured in your Auth0 tenant
 * - The screen will automatically re-render with the new language after submission
 * - Custom fields can be included and will be accessible in the Post Login Trigger
 * 
 * @category Language
 * @commonFeature
 */
export async function changeLanguage(options: LanguageChangeOptions): Promise<void> {
  const context = new BaseContext();
  await context.changeLanguage(options);
}