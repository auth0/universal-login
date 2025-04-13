import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';

const MfaOtpChallengeContext = createContext<MfaOtpChallenge | null>(null);

export function useMfaOtpChallenge(): MfaOtpChallenge {
  return useMemo(() => new MfaOtpChallenge(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaOtpChallenge();
  return <MfaOtpChallengeContext.Provider value={screen}>{children}</MfaOtpChallengeContext.Provider>;
};

export function useCurrentScreen(): MfaOtpChallenge {
  const screen = useContext(MfaOtpChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-challenge';
