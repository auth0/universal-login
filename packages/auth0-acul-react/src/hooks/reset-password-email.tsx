import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';

const ResetPasswordEmailContext = createContext<ResetPasswordEmail | null>(null);

export function useResetPasswordEmail(): ResetPasswordEmail {
  return useMemo(() => new ResetPasswordEmail(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordEmail();
  return <ResetPasswordEmailContext.Provider value={screen}>{children}</ResetPasswordEmailContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordEmail {
  const screen = useContext(ResetPasswordEmailContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-email';
