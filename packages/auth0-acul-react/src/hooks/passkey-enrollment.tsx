import React, { createContext, useContext, useMemo } from 'react';
import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';

const PasskeyEnrollmentContext = createContext<PasskeyEnrollment | null>(null);

export function usePasskeyEnrollment(): PasskeyEnrollment {
  return useMemo(() => new PasskeyEnrollment(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = usePasskeyEnrollment();
  return <PasskeyEnrollmentContext.Provider value={screen}>{children}</PasskeyEnrollmentContext.Provider>;
};

export function useCurrentScreen(): PasskeyEnrollment {
  const screen = useContext(PasskeyEnrollmentContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/passkey-enrollment';
