import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { EmailVerificationResultMembers } from '@auth0/auth0-acul-js/email-verification-result';

// Register the singleton instance of EmailVerificationResult
const instance = registerScreen<EmailVerificationResultMembers>(EmailVerificationResult)!;

// Context hooks
const factory = new ContextHooks<EmailVerificationResultMembers>(instance);
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

// Main instance hook. Returns singleton instance of EmailVerificationResult
export const useEmailVerificationResult = (): EmailVerificationResultMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
