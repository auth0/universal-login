import React, { createContext, useContext, useMemo } from 'react';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';

const MfaCountryCodesContext = createContext<MfaCountryCodes | null>(null);

export function useMfaCountryCodes(): MfaCountryCodes {
  return useMemo(() => new MfaCountryCodes(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaCountryCodes();
  return <MfaCountryCodesContext.Provider value={screen}>{children}</MfaCountryCodesContext.Provider>;
};

export function useCurrentScreen(): MfaCountryCodes {
  const screen = useContext(MfaCountryCodesContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-country-codes';
