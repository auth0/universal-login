import React, { createContext, useContext, useMemo } from 'react';
import Login from '@auth0/auth0-acul-js/login';

const LoginContext = createContext<Login | null>(null);

export function useLogin(): Login {
  return useMemo(() => new Login(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useLogin();
  return <LoginContext.Provider value={screen}>{children}</LoginContext.Provider>;
};

export function useCurrentScreen(): Login {
  const screen = useContext(LoginContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/login';
