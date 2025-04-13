import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

const MfaOtpEnrollmentQrContext = createContext<MfaOtpEnrollmentQr | null>(null);

export function useMfaOtpEnrollmentQr(): MfaOtpEnrollmentQr {
  return useMemo(() => new MfaOtpEnrollmentQr(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaOtpEnrollmentQr();
  return <MfaOtpEnrollmentQrContext.Provider value={screen}>{children}</MfaOtpEnrollmentQrContext.Provider>;
};

export function useCurrentScreen(): MfaOtpEnrollmentQr {
  const screen = useContext(MfaOtpEnrollmentQrContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
