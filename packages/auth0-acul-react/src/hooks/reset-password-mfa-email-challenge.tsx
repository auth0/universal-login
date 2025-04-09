import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

const ResetPasswordMfaEmailChallengeContext = createContext<ResetPasswordMfaEmailChallenge | null>(null);

export function useResetPasswordMfaEmailChallenge(): ResetPasswordMfaEmailChallenge {
  return useMemo(() => new ResetPasswordMfaEmailChallenge(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordMfaEmailChallenge();
  return <ResetPasswordMfaEmailChallengeContext.Provider value={screen}>{children}</ResetPasswordMfaEmailChallengeContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordMfaEmailChallenge {
  const screen = useContext(ResetPasswordMfaEmailChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
