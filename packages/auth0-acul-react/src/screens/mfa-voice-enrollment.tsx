import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaVoiceEnrollmentMembers,
  ContinueOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-voice-enrollment';

// Register the singleton instance of MfaVoiceEnrollment
const instance = registerScreen<MfaVoiceEnrollmentMembers>(MfaVoiceEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaVoiceEnrollmentMembers>(instance);
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
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const selectPhoneCountryCode = (payload?: CustomOptions) =>
  withError(instance.selectPhoneCountryCode(payload));

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

// Main instance hook. Returns singleton instance of MfaVoiceEnrollment
export const useMfaVoiceEnrollment = (): MfaVoiceEnrollmentMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
