import { useMemo } from 'react';
import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';
import { ContextHooks } from '../hooks/context';
import type { InterstitialCaptchaMembers } from '@auth0/auth0-acul-js/interstitial-captcha';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): InterstitialCaptchaMembers {
  try {
    return getScreen<InterstitialCaptchaMembers>();
  } catch {
    const instance = new InterstitialCaptcha();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<InterstitialCaptchaMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of InterstitialCaptcha
export const useInterstitialCaptcha = (): InterstitialCaptchaMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/interstitial-captcha';