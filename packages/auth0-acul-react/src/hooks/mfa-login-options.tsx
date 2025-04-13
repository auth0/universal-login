import React, { createContext, useContext, useMemo } from 'react';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';

const MfaLoginOptionsContext = createContext<MfaLoginOptions | null>(null);

export function useMfaLoginOptions(): MfaLoginOptions {
  return useMemo(() => new MfaLoginOptions(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaLoginOptions();
  return <MfaLoginOptionsContext.Provider value={screen}>{children}</MfaLoginOptionsContext.Provider>;
};

export function useCurrentScreen(): MfaLoginOptions {
  const screen = useContext(MfaLoginOptionsContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-login-options';
