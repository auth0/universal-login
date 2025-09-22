import MfaWebAuthnEnrollmentSuccess from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnEnrollmentSuccessMembers,
  ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';

// Register the singleton instance of MfaWebAuthnEnrollmentSuccess
const instance = registerScreen<MfaWebAuthnEnrollmentSuccessMembers>(MfaWebAuthnEnrollmentSuccess)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnEnrollmentSuccessMembers>(instance);
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
export const continueMethod = (payload?: ContinueOptions) => withError(instance.continue(payload));

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

// Main instance hook. Returns singleton instance of MfaWebAuthnEnrollmentSuccess
export const useMfaWebAuthnEnrollmentSuccess = (): MfaWebAuthnEnrollmentSuccessMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
