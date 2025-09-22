import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnRoamingEnrollmentMembers,
  CustomOptions,
  ShowErrorOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

// Register the singleton instance of MfaWebAuthnRoamingEnrollment
const instance = registerScreen<MfaWebAuthnRoamingEnrollmentMembers>(MfaWebAuthnRoamingEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnRoamingEnrollmentMembers>(instance);
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
export const enroll = (payload: CustomOptions) => withError(instance.enroll(payload));
export const showError = (payload: ShowErrorOptions) => withError(instance.showError(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) =>
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
} from '../hooks/common';

// Main instance hook. Returns singleton instance of MfaWebAuthnRoamingEnrollment
export const useMfaWebAuthnRoamingEnrollment = (): MfaWebAuthnRoamingEnrollmentMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
