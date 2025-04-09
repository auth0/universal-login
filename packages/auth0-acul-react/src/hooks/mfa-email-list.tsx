import React, { createContext, useContext, useMemo } from 'react';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';

const MfaEmailListContext = createContext<MfaEmailList | null>(null);

export function useMfaEmailList(): MfaEmailList {
  return useMemo(() => new MfaEmailList(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaEmailList();
  return <MfaEmailListContext.Provider value={screen}>{children}</MfaEmailListContext.Provider>;
};

export function useCurrentScreen(): MfaEmailList {
  const screen = useContext(MfaEmailListContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-email-list';
