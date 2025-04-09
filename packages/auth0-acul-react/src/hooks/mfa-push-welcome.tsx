import React, { createContext, useContext, useMemo } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const MfaPushWelcomeContext = createContext<MfaPushWelcome | null>(null);

export function useMfaPushWelcome(): MfaPushWelcome {
  return useMemo(() => new MfaPushWelcome(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaPushWelcome();
  return <MfaPushWelcomeContext.Provider value={screen}>{children}</MfaPushWelcomeContext.Provider>;
};

export function useCurrentScreen(): MfaPushWelcome {
  const screen = useContext(MfaPushWelcomeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-push-welcome';
