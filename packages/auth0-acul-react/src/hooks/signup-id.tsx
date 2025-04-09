import React, { createContext, useContext, useMemo } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';

const SignupIdContext = createContext<SignupId | null>(null);

export function useSignupId(): SignupId {
  return useMemo(() => new SignupId(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useSignupId();
  return <SignupIdContext.Provider value={screen}>{children}</SignupIdContext.Provider>;
};

export function useCurrentScreen(): SignupId {
  const screen = useContext(SignupIdContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/signup-id';
