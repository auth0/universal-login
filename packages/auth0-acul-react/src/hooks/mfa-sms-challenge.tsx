import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';

const MfaSmsChallengeContext = createContext<MfaSmsChallenge | null>(null);

export function useMfaSmsChallenge(): MfaSmsChallenge {
  return useMemo(() => new MfaSmsChallenge(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaSmsChallenge();
  return <MfaSmsChallengeContext.Provider value={screen}>{children}</MfaSmsChallengeContext.Provider>;
};

export function useCurrentScreen(): MfaSmsChallenge {
  const screen = useContext(MfaSmsChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-challenge';
