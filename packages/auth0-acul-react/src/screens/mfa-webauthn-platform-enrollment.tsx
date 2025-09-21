import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnPlatformEnrollmentMembers,
  SubmitPasskeyCredentialOptions,
  ReportBrowserErrorOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

// Register the singleton instance of MfaWebAuthnPlatformEnrollment
const instance = registerScreen<MfaWebAuthnPlatformEnrollmentMembers>(
  MfaWebAuthnPlatformEnrollment
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnPlatformEnrollmentMembers>(instance);
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
export const submitPasskeyCredential = (payload?: SubmitPasskeyCredentialOptions) =>
  withError(instance.submitPasskeyCredential(payload));
export const reportBrowserError = (payload: ReportBrowserErrorOptions) =>
  withError(instance.reportBrowserError(payload));
export const snoozeEnrollment = (payload?: CustomOptions) =>
  withError(instance.snoozeEnrollment(payload));
export const refuseEnrollmentOnThisDevice = (payload?: CustomOptions) =>
  withError(instance.refuseEnrollmentOnThisDevice(payload));

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

// Main instance hook. Returns singleton instance of MfaWebAuthnPlatformEnrollment
export const useMfaWebAuthnPlatformEnrollment = (): MfaWebAuthnPlatformEnrollmentMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
