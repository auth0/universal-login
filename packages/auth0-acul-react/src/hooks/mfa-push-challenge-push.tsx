import React, { createContext, useContext, useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const MfaPushChallengePushContext = createContext<MfaPushChallengePush | null>(null);

export function useMfaPushChallengePush(): MfaPushChallengePush {
  return useMemo(() => new MfaPushChallengePush(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaPushChallengePush();
  return <MfaPushChallengePushContext.Provider value={screen}>{children}</MfaPushChallengePushContext.Provider>;
};

export function useCurrentScreen(): MfaPushChallengePush {
  const screen = useContext(MfaPushChallengePushContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-push-challenge-push';
