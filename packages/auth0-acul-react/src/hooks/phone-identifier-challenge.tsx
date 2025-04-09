import React, { createContext, useContext, useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const PhoneIdentifierChallengeContext = createContext<PhoneIdentifierChallenge | null>(null);

export function usePhoneIdentifierChallenge(): PhoneIdentifierChallenge {
  return useMemo(() => new PhoneIdentifierChallenge(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = usePhoneIdentifierChallenge();
  return <PhoneIdentifierChallengeContext.Provider value={screen}>{children}</PhoneIdentifierChallengeContext.Provider>;
};

export function useCurrentScreen(): PhoneIdentifierChallenge {
  const screen = useContext(PhoneIdentifierChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';
