import React, { createContext, useContext, useMemo } from 'react';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';

const MfaPushListContext = createContext<MfaPushList | null>(null);

export function useMfaPushList(): MfaPushList {
  return useMemo(() => new MfaPushList(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaPushList();
  return <MfaPushListContext.Provider value={screen}>{children}</MfaPushListContext.Provider>;
};

export function useCurrentScreen(): MfaPushList {
  const screen = useContext(MfaPushListContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-push-list';
