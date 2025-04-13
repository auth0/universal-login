import React, { createContext, useContext, useMemo } from 'react';
import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';

const PasskeyEnrollmentLocalContext = createContext<PasskeyEnrollmentLocal | null>(null);

export function usePasskeyEnrollmentLocal(): PasskeyEnrollmentLocal {
  return useMemo(() => new PasskeyEnrollmentLocal(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = usePasskeyEnrollmentLocal();
  return <PasskeyEnrollmentLocalContext.Provider value={screen}>{children}</PasskeyEnrollmentLocalContext.Provider>;
};

export function useCurrentScreen(): PasskeyEnrollmentLocal {
  const screen = useContext(PasskeyEnrollmentLocalContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/passkey-enrollment-local';
