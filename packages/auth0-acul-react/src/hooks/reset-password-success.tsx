import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';

const ResetPasswordSuccessContext = createContext<ResetPasswordSuccess | null>(null);

export function useResetPasswordSuccess(): ResetPasswordSuccess {
  return useMemo(() => new ResetPasswordSuccess(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordSuccess();
  return <ResetPasswordSuccessContext.Provider value={screen}>{children}</ResetPasswordSuccessContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordSuccess {
  const screen = useContext(ResetPasswordSuccessContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-success';
