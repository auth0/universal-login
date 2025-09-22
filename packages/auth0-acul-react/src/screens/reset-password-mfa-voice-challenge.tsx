import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaVoiceChallengeMembers,
  ContinueOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

// Register the singleton instance of ResetPasswordMfaVoiceChallenge
const instance = registerScreen<ResetPasswordMfaVoiceChallengeMembers>(
  ResetPasswordMfaVoiceChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaVoiceChallengeMembers>(instance);
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
export const switchToSms = (payload?: CustomOptions) => withError(instance.switchToSms(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));

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

// Main instance hook. Returns singleton instance of ResetPasswordMfaVoiceChallenge
export const useResetPasswordMfaVoiceChallenge = (): ResetPasswordMfaVoiceChallengeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
