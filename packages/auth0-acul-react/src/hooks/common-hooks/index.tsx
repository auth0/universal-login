import { 
  getCurrentScreenOptions, 
  getCurrentThemeOptions, 
  getErrors, 
  CurrentScreenOptions, 
  FlattenedTheme,
  type Error as TransactionError
} from '@auth0/auth0-acul-js';

export const useCurrentScreen = (): CurrentScreenOptions | null => {
  return getCurrentScreenOptions();
};

export const useAuth0Themes = (): FlattenedTheme | null => {
  return getCurrentThemeOptions();
};

export const useErrors = (): TransactionError[] | null => {
  return getErrors();
};
