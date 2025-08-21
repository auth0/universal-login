import { BaseContext } from './models/base-context';
import { Branding } from './models/branding';
import { flattenColors, flattenFonts, flattenBorders, flattenPageBackground, flattenWidget } from './utils/theme-utils';

import type { CurrentScreenOptions } from '../interfaces/common';
import type { FlattenedTheme } from '../interfaces/common';
import type { Error as TransactionError } from '../interfaces/models/transaction';
export * from './screens';
export * from '../interfaces/export/base-properties';
export * from '../interfaces/export/screen-properties';
export * from '../interfaces/export/options';
export * from '../interfaces/export/extended-types';
export * from '../interfaces/export/common';
export * from '../interfaces/export/utils';

export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}

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

