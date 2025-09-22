import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaRecoveryCodeChallengeMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

// Register the singleton instance of ResetPasswordMfaRecoveryCodeChallenge
const instance = registerScreen<ResetPasswordMfaRecoveryCodeChallengeMembers>(
  ResetPasswordMfaRecoveryCodeChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaRecoveryCodeChallengeMembers>(instance);
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
export const continueMethod = (code: string, payload?: CustomOptions) =>
  withError(instance.continue(code, payload));
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
} from '../hooks/common';

// Main instance hook. Returns singleton instance of ResetPasswordMfaRecoveryCodeChallenge
export const useResetPasswordMfaRecoveryCodeChallenge =
  (): ResetPasswordMfaRecoveryCodeChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
