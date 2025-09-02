import { useMemo } from 'react';
import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';
import { ContextHooks } from '../hooks/context-hooks';

import type { InterstitialCaptchaMembers } from '@auth0/auth0-acul-js/interstitial-captcha';
let instance: InterstitialCaptchaMembers | null = null;
const getInstance = (): InterstitialCaptchaMembers => {
  if (!instance) {
    instance = new InterstitialCaptcha();
  }
  return instance;
};

export const useInterstitialCaptcha = (): InterstitialCaptchaMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

export type { SubmitCaptchaOptions, InterstitialCaptchaMembers } from '@auth0/auth0-acul-js/interstitial-captcha';

export type * from '@auth0/auth0-acul-js/interstitial-captcha';