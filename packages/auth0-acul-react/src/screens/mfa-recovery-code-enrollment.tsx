import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaRecoveryCodeEnrollmentMembers,
  MfaRecoveryCodeEnrollmentContinueOptions,
} from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';

// Register the singleton instance of MfaRecoveryCodeEnrollment
const instance = registerScreen<MfaRecoveryCodeEnrollmentMembers>(MfaRecoveryCodeEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaRecoveryCodeEnrollmentMembers>(instance);
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
export const continueMethod = (payload: MfaRecoveryCodeEnrollmentContinueOptions) =>
  withError(instance.continue(payload));

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

// Main instance hook. Returns singleton instance of MfaRecoveryCodeEnrollment
export const useMfaRecoveryCodeEnrollment = (): MfaRecoveryCodeEnrollmentMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
