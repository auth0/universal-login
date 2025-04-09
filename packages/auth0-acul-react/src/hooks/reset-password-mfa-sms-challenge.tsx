import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

const ResetPasswordMfaSmsChallengeContext = createContext<ResetPasswordMfaSmsChallenge | null>(null);

export function useResetPasswordMfaSmsChallenge(): ResetPasswordMfaSmsChallenge {
  return useMemo(() => new ResetPasswordMfaSmsChallenge(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordMfaSmsChallenge();
  return <ResetPasswordMfaSmsChallengeContext.Provider value={screen}>{children}</ResetPasswordMfaSmsChallengeContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordMfaSmsChallenge {
  const screen = useContext(ResetPasswordMfaSmsChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
