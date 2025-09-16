import { getCurrentThemeOptions, FlattenedTheme } from '@auth0/auth0-acul-js';

export const useAuth0Themes = (): FlattenedTheme | null => {
  return getCurrentThemeOptions();
};
