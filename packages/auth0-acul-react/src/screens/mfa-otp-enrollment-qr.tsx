import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaOtpEnrollmentQrMembers,
  CustomOptions,
  ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

// Register the singleton instance of MfaOtpEnrollmentQr
const instance = registerScreen<MfaOtpEnrollmentQrMembers>(MfaOtpEnrollmentQr)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaOtpEnrollmentQrMembers>(instance);
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
export const toggleView = (payload?: CustomOptions) => withError(instance.toggleView(payload));
export const continueMethod = (payload: ContinueOptions) => withError(instance.continue(payload));
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

// Main instance hook. Returns singleton instance of MfaOtpEnrollmentQr
export const useMfaOtpEnrollmentQr = (): MfaOtpEnrollmentQrMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
