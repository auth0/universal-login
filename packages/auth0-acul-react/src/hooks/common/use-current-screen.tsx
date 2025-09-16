import { getCurrentScreenOptions, CurrentScreenOptions } from '@auth0/auth0-acul-js';

export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};
