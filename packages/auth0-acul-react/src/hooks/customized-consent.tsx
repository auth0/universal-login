import React, { createContext, useContext, useMemo } from 'react';
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

const CustomizedConsentContext = createContext<CustomizedConsent | null>(null);

export function useCustomizedConsent(): CustomizedConsent {
  return useMemo(() => new CustomizedConsent(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useCustomizedConsent();
  return <CustomizedConsentContext.Provider value={screen}>{children}</CustomizedConsentContext.Provider>;
};

export function useCurrentScreen(): CustomizedConsent {
  const screen = useContext(CustomizedConsentContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/customized-consent';
