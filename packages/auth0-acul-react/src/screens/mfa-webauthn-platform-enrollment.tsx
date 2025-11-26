import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
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
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaWebAuthnPlatformEnrollment
export const useMfaWebAuthnPlatformEnrollment = (): MfaWebAuthnPlatformEnrollmentMembers =>
  useMemo(() => instance, []);
