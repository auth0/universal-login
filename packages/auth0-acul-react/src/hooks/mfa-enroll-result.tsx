import React, { createContext, useContext, useMemo } from 'react';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';

const MfaEnrollResultContext = createContext<MfaEnrollResult | null>(null);

export function useMfaEnrollResult(): MfaEnrollResult {
  return useMemo(() => new MfaEnrollResult(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaEnrollResult();
  return <MfaEnrollResultContext.Provider value={screen}>{children}</MfaEnrollResultContext.Provider>;
};

export function useCurrentScreen(): MfaEnrollResult {
  const screen = useContext(MfaEnrollResultContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-enroll-result';
