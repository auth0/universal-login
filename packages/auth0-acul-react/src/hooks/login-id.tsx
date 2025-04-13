import React, { createContext, useContext, useMemo } from 'react';
import LoginId from '@auth0/auth0-acul-js/login-id';

const LoginIdContext = createContext<LoginId | null>(null);

export function useLoginId(): LoginId {
  return useMemo(() => new LoginId(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useLoginId();
  return <LoginIdContext.Provider value={screen}>{children}</LoginIdContext.Provider>;
};

export function useCurrentScreen(): LoginId {
  const screen = useContext(LoginIdContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/login-id';
