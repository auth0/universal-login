import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { InterstitialCaptchaMembers } from '@auth0/auth0-acul-js/interstitial-captcha';

// Register the singleton instance of InterstitialCaptcha
const instance = registerScreen<InterstitialCaptchaMembers>(InterstitialCaptcha)!;

// Context hooks
const factory = new ContextHooks<InterstitialCaptchaMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorType,
} from '../hooks';

// Main instance hook. Returns singleton instance of InterstitialCaptcha
export const useInterstitialCaptcha = (): InterstitialCaptchaMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
