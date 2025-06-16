import { BaseContext } from './models/base-context';

import type { Error } from '../interfaces/models/transaction';

export * from './screens';
export * from '../interfaces/export/base-properties';
export * from '../interfaces/export/screen-properties';
export * from '../interfaces/export/options';
export * from '../interfaces/export/extended-types';
export * from '../interfaces/export/common';

export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}

export function getError(): Error[] {
  try {
    const context = new BaseContext();
    return context.transaction?.errors ?? [];
  } catch {
    return [];
  }
}