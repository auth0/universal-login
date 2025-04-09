import React, { createContext, useContext, useMemo } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';

const SignupPasswordContext = createContext<SignupPassword | null>(null);

export function useSignupPassword(): SignupPassword {
  return useMemo(() => new SignupPassword(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useSignupPassword();
  return <SignupPasswordContext.Provider value={screen}>{children}</SignupPasswordContext.Provider>;
};

export function useCurrentScreen(): SignupPassword {
  const screen = useContext(SignupPasswordContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/signup-password';
