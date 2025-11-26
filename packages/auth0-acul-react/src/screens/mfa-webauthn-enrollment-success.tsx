import MfaWebAuthnEnrollmentSuccess from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
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
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaWebAuthnEnrollmentSuccess
export const useMfaWebAuthnEnrollmentSuccess = (): MfaWebAuthnEnrollmentSuccessMembers =>
  useMemo(() => instance, []);
