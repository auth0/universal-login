import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';

const ResetPasswordRequestContext = createContext<ResetPasswordRequest | null>(null);

export function useResetPasswordRequest(): ResetPasswordRequest {
  return useMemo(() => new ResetPasswordRequest(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordRequest();
  return <ResetPasswordRequestContext.Provider value={screen}>{children}</ResetPasswordRequestContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordRequest {
  const screen = useContext(ResetPasswordRequestContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-request';
