import React, { createContext, useContext, useMemo } from 'react';
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';

const PhoneIdentifierEnrollmentContext = createContext<PhoneIdentifierEnrollment | null>(null);

export function usePhoneIdentifierEnrollment(): PhoneIdentifierEnrollment {
  return useMemo(() => new PhoneIdentifierEnrollment(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = usePhoneIdentifierEnrollment();
  return <PhoneIdentifierEnrollmentContext.Provider value={screen}>{children}</PhoneIdentifierEnrollmentContext.Provider>;
};

export function useCurrentScreen(): PhoneIdentifierEnrollment {
  const screen = useContext(PhoneIdentifierEnrollmentContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/phone-identifier-enrollment';
