import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';

const ResetPasswordErrorContext = createContext<ResetPasswordError | null>(null);

export function useResetPasswordError(): ResetPasswordError {
  return useMemo(() => new ResetPasswordError(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordError();
  return <ResetPasswordErrorContext.Provider value={screen}>{children}</ResetPasswordErrorContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordError {
  const screen = useContext(ResetPasswordErrorContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-error';
