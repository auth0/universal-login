import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

const MfaSmsEnrollmentContext = createContext<MfaSmsEnrollment | null>(null);

export function useMfaSmsEnrollment(): MfaSmsEnrollment {
  return useMemo(() => new MfaSmsEnrollment(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaSmsEnrollment();
  return <MfaSmsEnrollmentContext.Provider value={screen}>{children}</MfaSmsEnrollmentContext.Provider>;
};

export function useCurrentScreen(): MfaSmsEnrollment {
  const screen = useContext(MfaSmsEnrollmentContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-enrollment';
