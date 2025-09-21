import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  LoginEmailVerificationMembers,
  ContinueWithCodeOptions,
  ResendCodeOptions,
} from '@auth0/auth0-acul-js/login-email-verification';

// Register the singleton instance of LoginEmailVerification
const instance = registerScreen<LoginEmailVerificationMembers>(LoginEmailVerification)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginEmailVerificationMembers>(instance);
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
export const continueWithCode = (payload: ContinueWithCodeOptions) =>
  withError(instance.continueWithCode(payload));
export const resendCode = (payload?: ResendCodeOptions) => withError(instance.resendCode(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

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

// Main instance hook. Returns singleton instance of LoginEmailVerification
export const useLoginEmailVerification = (): LoginEmailVerificationMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
