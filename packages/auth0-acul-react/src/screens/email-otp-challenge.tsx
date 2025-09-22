import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  EmailOTPChallengeMembers,
  OtpCodeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/email-otp-challenge';

// Register the singleton instance of EmailOTPChallenge
const instance = registerScreen<EmailOTPChallengeMembers>(EmailOTPChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<EmailOTPChallengeMembers>(instance);
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
export const submitCode = (options: OtpCodeOptions) => withError(instance.submitCode(options));
export const resendCode = (options?: CustomOptions) => withError(instance.resendCode(options));

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

// Main instance hook. Returns singleton instance of EmailOTPChallenge
export const useEmailOTPChallenge = (): EmailOTPChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
