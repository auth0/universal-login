import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';

// Register the singleton instance of ResetPasswordMfaOtpChallenge
const instance = registerScreen<ResetPasswordMfaOtpChallengeMembers>(ResetPasswordMfaOtpChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaOtpChallengeMembers>(instance);
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
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of ResetPasswordMfaOtpChallenge
export const useResetPasswordMfaOtpChallenge = (): ResetPasswordMfaOtpChallengeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
