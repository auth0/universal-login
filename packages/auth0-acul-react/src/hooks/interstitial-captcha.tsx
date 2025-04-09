import React, { createContext, useContext, useMemo } from 'react';
import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';

const InterstitialCaptchaContext = createContext<InterstitialCaptcha | null>(null);

export function useInterstitialCaptcha(): InterstitialCaptcha {
  return useMemo(() => new InterstitialCaptcha(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useInterstitialCaptcha();
  return <InterstitialCaptchaContext.Provider value={screen}>{children}</InterstitialCaptchaContext.Provider>;
};

export function useCurrentScreen(): InterstitialCaptcha {
  const screen = useContext(InterstitialCaptchaContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/interstitial-captcha';
