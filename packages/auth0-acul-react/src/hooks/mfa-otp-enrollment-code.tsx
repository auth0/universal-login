import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

const MfaOtpEnrollmentCodeContext = createContext<MfaOtpEnrollmentCode | null>(null);

export function useMfaOtpEnrollmentCode(): MfaOtpEnrollmentCode {
  return useMemo(() => new MfaOtpEnrollmentCode(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaOtpEnrollmentCode();
  return <MfaOtpEnrollmentCodeContext.Provider value={screen}>{children}</MfaOtpEnrollmentCodeContext.Provider>;
};

export function useCurrentScreen(): MfaOtpEnrollmentCode {
  const screen = useContext(MfaOtpEnrollmentCodeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
