import { getScreen } from '../../state/instance-store';

interface WithActiveIdentifiers {
  getActiveIdentifiers: () => string[];
}

export const useActiveIdentifiers = (): string[] => {
  const instance = getScreen<WithActiveIdentifiers>();
  return instance.getActiveIdentifiers() ?? [];
};
