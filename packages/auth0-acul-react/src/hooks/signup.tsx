import React, { createContext, useContext, useMemo } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';

const SignupContext = createContext<Signup | null>(null);

export function useSignup(): Signup {
  return useMemo(() => new Signup(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useSignup();
  return <SignupContext.Provider value={screen}>{children}</SignupContext.Provider>;
};

export function useCurrentScreen(): Signup {
  const screen = useContext(SignupContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/signup';
