import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/mfa-otp-challenge';

// Register the singleton instance of MfaOtpChallenge
const instance = registerScreen<MfaOtpChallengeMembers>(MfaOtpChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaOtpChallengeMembers>(instance);
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

// Main instance hook. Returns singleton instance of MfaOtpChallenge
export const useMfaOtpChallenge = (): MfaOtpChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
