import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-sms-challenge';

// Register the singleton instance of MfaSmsChallenge
const instance = registerScreen<MfaSmsChallengeMembers>(MfaSmsChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaSmsChallengeMembers>(instance);
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
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) =>
  withError(instance.continueMfaSmsChallenge(payload));
export const pickSms = (payload?: CustomOptions) => withError(instance.pickSms(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const getACall = (payload?: CustomOptions) => withError(instance.getACall(payload));

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

// Main instance hook. Returns singleton instance of MfaSmsChallenge
export const useMfaSmsChallenge = (): MfaSmsChallengeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
