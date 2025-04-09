import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';

const ResetPasswordMfaOtpChallengeContext = createContext<ResetPasswordMfaOtpChallenge | null>(null);

export function useResetPasswordMfaOtpChallenge(): ResetPasswordMfaOtpChallenge {
  return useMemo(() => new ResetPasswordMfaOtpChallenge(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useResetPasswordMfaOtpChallenge();
  return <ResetPasswordMfaOtpChallengeContext.Provider value={screen}>{children}</ResetPasswordMfaOtpChallengeContext.Provider>;
};

export function useCurrentScreen(): ResetPasswordMfaOtpChallenge {
  const screen = useContext(ResetPasswordMfaOtpChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
