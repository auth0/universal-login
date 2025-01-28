import { BaseContext } from './models/base-context';
export * from './screens';
export function getCurrentScreen(): string | null {
  return new BaseContext().getContext('screen')?.name ?? null;
}
