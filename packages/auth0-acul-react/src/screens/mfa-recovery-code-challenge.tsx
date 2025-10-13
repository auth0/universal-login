import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaRecoveryCodeChallengeMembers,
  ContinueOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

// Register the singleton instance of MfaRecoveryCodeChallenge
const instance = registerScreen<MfaRecoveryCodeChallengeMembers>(MfaRecoveryCodeChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaRecoveryCodeChallengeMembers>(instance);
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
export const tryAnotherMethod = (payload?: CustomOptions) =>
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
} from '../hooks';

// Main instance hook. Returns singleton instance of MfaRecoveryCodeChallenge
export const useMfaRecoveryCodeChallenge = (): MfaRecoveryCodeChallengeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
