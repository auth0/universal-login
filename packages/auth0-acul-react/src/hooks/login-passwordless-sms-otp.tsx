import React, { createContext, useContext, useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

const LoginPasswordlessSmsOtpContext = createContext<LoginPasswordlessSmsOtp | null>(null);

export function useLoginPasswordlessSmsOtp(): LoginPasswordlessSmsOtp {
  return useMemo(() => new LoginPasswordlessSmsOtp(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useLoginPasswordlessSmsOtp();
  return <LoginPasswordlessSmsOtpContext.Provider value={screen}>{children}</LoginPasswordlessSmsOtpContext.Provider>;
};

export function useCurrentScreen(): LoginPasswordlessSmsOtp {
  const screen = useContext(LoginPasswordlessSmsOtpContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
