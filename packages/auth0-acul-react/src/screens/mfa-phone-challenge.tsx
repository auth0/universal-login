import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPhoneChallengeMembers,
  ContinueOptions,
  PickPhoneOptions,
  PickAuthenticatorOptions,
} from '@auth0/auth0-acul-js/mfa-phone-challenge';

// Register the singleton instance of MfaPhoneChallenge
const instance = registerScreen<MfaPhoneChallengeMembers>(MfaPhoneChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPhoneChallengeMembers>(instance);
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

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(instance.continue(payload));
export const pickPhone = (payload?: PickPhoneOptions) => withError(instance.pickPhone(payload));
export const tryAnotherMethod = (payload?: PickAuthenticatorOptions) =>
  withError(instance.tryAnotherMethod(payload));

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

// Main instance hook. Returns singleton instance of MfaPhoneChallenge
export const useMfaPhoneChallenge = (): MfaPhoneChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
