import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';

const MfaSmsListContext = createContext<MfaSmsList | null>(null);

export function useMfaSmsList(): MfaSmsList {
  return useMemo(() => new MfaSmsList(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaSmsList();
  return <MfaSmsListContext.Provider value={screen}>{children}</MfaSmsListContext.Provider>;
};

export function useCurrentScreen(): MfaSmsList {
  const screen = useContext(MfaSmsListContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-list';
