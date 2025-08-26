import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaRecoveryCodeChallengeNewCodeMembers,
  ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';

// Register the singleton instance of MfaRecoveryCodeChallengeNewCode
const instance = registerScreen<MfaRecoveryCodeChallengeNewCodeMembers>(
  MfaRecoveryCodeChallengeNewCode
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaRecoveryCodeChallengeNewCodeMembers>(instance);
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
export const continueMethod = (payload?: ContinueOptions) => withError(instance.continue(payload));

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

// Main instance hook. Returns singleton instance of MfaRecoveryCodeChallengeNewCode
export const useMfaRecoveryCodeChallengeNewCode = (): MfaRecoveryCodeChallengeNewCodeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
