import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

// Register the singleton instance of ResetPasswordMfaEmailChallenge
const instance = registerScreen<ResetPasswordMfaEmailChallengeMembers>(
  ResetPasswordMfaEmailChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaEmailChallengeMembers>(instance);
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
export const resendCode = (payload?: ResendCodeOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordMfaEmailChallenge
export const useResetPasswordMfaEmailChallenge = (): ResetPasswordMfaEmailChallengeMembers =>
  useMemo(() => instance, []);
