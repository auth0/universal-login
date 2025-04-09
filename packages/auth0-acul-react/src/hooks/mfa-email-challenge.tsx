import React, { createContext, useContext, useMemo } from 'react';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const MfaEmailChallengeContext = createContext<MfaEmailChallenge | null>(null);

export function useMfaEmailChallenge(): MfaEmailChallenge {
  return useMemo(() => new MfaEmailChallenge(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaEmailChallenge();
  return <MfaEmailChallengeContext.Provider value={screen}>{children}</MfaEmailChallengeContext.Provider>;
};

export function useCurrentScreen(): MfaEmailChallenge {
  const screen = useContext(MfaEmailChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-email-challenge';
