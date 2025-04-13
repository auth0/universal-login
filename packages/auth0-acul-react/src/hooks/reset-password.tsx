import React, { createContext, useContext, useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';

const ResetPasswordContext = createContext<ResetPassword | null>(null);

export function useResetPassword(): ResetPassword {
  return useMemo(() => new ResetPassword(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPassword();
  return <ResetPasswordContext.Provider value={screen}>{children}</ResetPasswordContext.Provider>;
};

export function useCurrentScreen(): ResetPassword {
  const screen = useContext(ResetPasswordContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password';
