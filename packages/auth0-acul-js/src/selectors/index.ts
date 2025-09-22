import { BaseContext } from '../models/base-context';
import { Branding } from '../models/branding';
import { flattenColors, flattenFonts, flattenBorders, flattenPageBackground, flattenWidget } from '../utils/theme-utils';

import type { CurrentScreenOptions } from '../../interfaces/common';
import type { FlattenedTheme } from '../../interfaces/common';
import type { Error as TransactionError } from '../../interfaces/models/transaction';

/**
 * Gets the current screen name from the authentication context
 * @returns The current screen name or null if no screen is active
 */
export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}

/**
 * Gets the current screen options including client, organization, prompt, screen, tenant, transaction, and untrusted data
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
 * @returns Array of Error objects or null if no errors are present
 */
export function getErrors(): TransactionError[] | null {
  const context = new BaseContext();
  const transaction = context.getContext('transaction');

  return (transaction?.errors as TransactionError[]) ?? null;
}