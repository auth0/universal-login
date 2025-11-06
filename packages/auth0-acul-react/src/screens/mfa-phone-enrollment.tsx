import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPhoneEnrollmentMembers,
  CustomOptions,
  ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-phone-enrollment';

// Register the singleton instance of MfaPhoneEnrollment
const instance = registerScreen<MfaPhoneEnrollmentMembers>(MfaPhoneEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPhoneEnrollmentMembers>(instance);
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
export const pickCountryCode = (payload?: CustomOptions) =>
  withError(instance.pickCountryCode(payload));
export const continueEnrollment = (payload: ContinueOptions) =>
  withError(instance.continueEnrollment(payload));
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
  type ErrorType,
} from '../hooks';

// Main instance hook. Returns singleton instance of MfaPhoneEnrollment
export const useMfaPhoneEnrollment = (): MfaPhoneEnrollmentMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
