import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  PasskeyEnrollmentLocalMembers,
  CustomOptions,
  AbortEnrollmentOptions,
} from '@auth0/auth0-acul-js/passkey-enrollment-local';

// Register the singleton instance of PasskeyEnrollmentLocal
const instance = registerScreen<PasskeyEnrollmentLocalMembers>(PasskeyEnrollmentLocal)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PasskeyEnrollmentLocalMembers>(instance);
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
export const continuePasskeyEnrollment = (payload?: CustomOptions) =>
  withError(instance.continuePasskeyEnrollment(payload));
export const abortPasskeyEnrollment = (payload: AbortEnrollmentOptions) =>
  withError(instance.abortPasskeyEnrollment(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of PasskeyEnrollmentLocal
export const usePasskeyEnrollmentLocal = (): PasskeyEnrollmentLocalMembers =>
  useMemo(() => instance, []);
