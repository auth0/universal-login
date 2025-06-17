import { BaseContext } from './models/base-context';
export * from './screens';
export * from '../interfaces/export/base-properties';
export * from '../interfaces/export/screen-properties';
export * from '../interfaces/export/options';
export * from '../interfaces/export/extended-types';
export * from '../interfaces/export/common';
export * from './utils/get-error';

export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}