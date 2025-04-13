import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

const ResetPasswordMfaPushChallengePushContext = createContext<ResetPasswordMfaPushChallengePush | null>(null);

export function useResetPasswordMfaPushChallengePush(): ResetPasswordMfaPushChallengePush {
  return useMemo(() => new ResetPasswordMfaPushChallengePush(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordMfaPushChallengePush();
  return <ResetPasswordMfaPushChallengePushContext.Provider value={screen}>{children}</ResetPasswordMfaPushChallengePushContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordMfaPushChallengePush {
  const screen = useContext(ResetPasswordMfaPushChallengePushContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
