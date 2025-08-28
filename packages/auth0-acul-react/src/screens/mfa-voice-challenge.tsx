import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaVoiceChallengeMembers,
  MfaVoiceChallengeContinueOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-voice-challenge';

// Register the singleton instance of MfaVoiceChallenge
const instance = registerScreen<MfaVoiceChallengeMembers>(MfaVoiceChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaVoiceChallengeMembers>(instance);
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
export const continueMethod = (payload: MfaVoiceChallengeContinueOptions) =>
  withError(instance.continue(payload));
export const pickPhone = (payload?: CustomOptions) => withError(instance.pickPhone(payload));
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
} from '../hooks';

// Main instance hook. Returns singleton instance of MfaVoiceChallenge
export const useMfaVoiceChallenge = (): MfaVoiceChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
