import React, { createContext, useContext, useMemo } from 'react';
import LoginPassword from '@auth0/auth0-acul-js/login-password';

const LoginPasswordContext = createContext<LoginPassword | null>(null);

export function useLoginPassword(): LoginPassword {
  return useMemo(() => new LoginPassword(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useLoginPassword();
  return <LoginPasswordContext.Provider value={screen}>{children}</LoginPasswordContext.Provider>;
};

export function useCurrentScreen(): LoginPassword {
  const screen = useContext(LoginPasswordContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/login-password';
