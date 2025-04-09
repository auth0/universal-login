import React, { createContext, useContext, useMemo } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';

const LoginPasswordlessEmailCodeContext = createContext<LoginPasswordlessEmailCode | null>(null);

export function useLoginPasswordlessEmailCode(): LoginPasswordlessEmailCode {
  return useMemo(() => new LoginPasswordlessEmailCode(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useLoginPasswordlessEmailCode();
  return <LoginPasswordlessEmailCodeContext.Provider value={screen}>{children}</LoginPasswordlessEmailCodeContext.Provider>;
};

export function useCurrentScreen(): LoginPasswordlessEmailCode {
  const screen = useContext(LoginPasswordlessEmailCodeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/login-passwordless-email-code';
