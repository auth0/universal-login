// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the InterstitialCaptcha screen

import React, { createContext, useContext, useMemo } from 'react';
import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';
import type { InterstitialCaptchaMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared InterstitialCaptcha instance.
 */
const InterstitialCaptchaContext = createContext<InterstitialCaptchaMembers | null>(null);

/**
 * Creates a new, independent InterstitialCaptcha instance.
 * @returns A fresh InterstitialCaptcha.
 */
export function useInterstitialCaptchaInstance(): InterstitialCaptchaMembers {
  return useMemo(() => new InterstitialCaptcha(), []);
}

/**
 * Provider component that supplies a shared InterstitialCaptcha instance.
 */
export const InterstitialCaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new InterstitialCaptcha(), []);
  return <InterstitialCaptchaContext.Provider value={instance}>{children}</InterstitialCaptchaContext.Provider>;
};

/**
 * Retrieves the shared InterstitialCaptcha instance from React context.
 *
 * @returns The shared InterstitialCaptcha instance provided by _InterstitialCaptchaProvider_.
 * @throws If used outside of _InterstitialCaptchaProvider_.
 */
export function useInterstitialCaptchaContext(): InterstitialCaptchaMembers {
  const ctx = useContext(InterstitialCaptchaContext);
  if (!ctx) {
    throw new Error('useInterstitialCaptchaContext must be used within _InterstitialCaptchaProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/interstitial-captcha';
