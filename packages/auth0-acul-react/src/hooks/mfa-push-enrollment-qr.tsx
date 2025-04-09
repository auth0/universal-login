import React, { createContext, useContext, useMemo } from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

const MfaPushEnrollmentQrContext = createContext<MfaPushEnrollmentQr | null>(null);

export function useMfaPushEnrollmentQr(): MfaPushEnrollmentQr {
  return useMemo(() => new MfaPushEnrollmentQr(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaPushEnrollmentQr();
  return <MfaPushEnrollmentQrContext.Provider value={screen}>{children}</MfaPushEnrollmentQrContext.Provider>;
};

export function useCurrentScreen(): MfaPushEnrollmentQr {
  const screen = useContext(MfaPushEnrollmentQrContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
