import React, { createContext, useContext, useMemo } from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';

const MfaBeginEnrollOptionsContext = createContext<MfaBeginEnrollOptions | null>(null);

export function useMfaBeginEnrollOptions(): MfaBeginEnrollOptions {
  return useMemo(() => new MfaBeginEnrollOptions(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaBeginEnrollOptions();
  return <MfaBeginEnrollOptionsContext.Provider value={screen}>{children}</MfaBeginEnrollOptionsContext.Provider>;
};

export function useCurrentScreen(): MfaBeginEnrollOptions {
  const screen = useContext(MfaBeginEnrollOptionsContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
