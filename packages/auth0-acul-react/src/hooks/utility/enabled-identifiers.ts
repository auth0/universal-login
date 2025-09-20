import type { Identifier } from "@auth0/auth0-acul-js";
import { getScreen } from '../../state/instance-store';

interface WithEnabledIdentifiers {
  getEnabledIdentifiers: () => Identifier[];
}

export const useEnabledIdentifiers = (): Identifier[] => {
  const instance = getScreen<WithEnabledIdentifiers>();
  return instance.getEnabledIdentifiers() ?? [];
};
