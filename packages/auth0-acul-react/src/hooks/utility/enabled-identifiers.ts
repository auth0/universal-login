import { getScreen } from '../../state/instance-store';

import type { Identifier } from '@auth0/auth0-acul-js';

interface WithEnabledIdentifiers {
  getEnabledIdentifiers: () => Identifier[];
}

export const useEnabledIdentifiers = (): Identifier[] => {
  const instance = getScreen<WithEnabledIdentifiers>();
  return instance.getEnabledIdentifiers() ?? [];
};
