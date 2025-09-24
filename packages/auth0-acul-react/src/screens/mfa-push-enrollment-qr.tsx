import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPushEnrollmentQrMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

// Register the singleton instance of MfaPushEnrollmentQr
const instance = registerScreen<MfaPushEnrollmentQrMembers>(MfaPushEnrollmentQr)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPushEnrollmentQrMembers>(instance);
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
export const pickAuthenticator = (payload?: CustomOptions) =>
  withError(instance.pickAuthenticator(payload));

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

// Main instance hook. Returns singleton instance of MfaPushEnrollmentQr
export const useMfaPushEnrollmentQr = (): MfaPushEnrollmentQrMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
