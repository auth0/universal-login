import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaPhoneChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

// Register the singleton instance of ResetPasswordMfaPhoneChallenge
const instance = registerScreen<ResetPasswordMfaPhoneChallengeMembers>(
  ResetPasswordMfaPhoneChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaPhoneChallengeMembers>(instance);
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
export const tryAnotherMethod = (payload: TryAnotherMethodOptions) =>
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

// Main instance hook. Returns singleton instance of ResetPasswordMfaPhoneChallenge
export const useResetPasswordMfaPhoneChallenge = (): ResetPasswordMfaPhoneChallengeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
