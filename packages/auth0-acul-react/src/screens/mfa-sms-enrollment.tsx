import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaSmsEnrollmentMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-sms-enrollment';

// Register the singleton instance of MfaSmsEnrollment
const instance = registerScreen<MfaSmsEnrollmentMembers>(MfaSmsEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaSmsEnrollmentMembers>(instance);
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
export const continueEnrollment = (payload: { phone: string; captcha?: string }) =>
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
  type ErrorKind,
} from '../hooks';

// Main instance hook. Returns singleton instance of MfaSmsEnrollment
export const useMfaSmsEnrollment = (): MfaSmsEnrollmentMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
