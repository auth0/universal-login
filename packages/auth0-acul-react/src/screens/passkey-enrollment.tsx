import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  PasskeyEnrollmentMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/passkey-enrollment';

// Register the singleton instance of PasskeyEnrollment
const instance = registerScreen<PasskeyEnrollmentMembers>(PasskeyEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PasskeyEnrollmentMembers>(instance);
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
export const abortPasskeyEnrollment = (payload?: CustomOptions) =>
  withError(instance.abortPasskeyEnrollment(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of PasskeyEnrollment
export const usePasskeyEnrollment = (): PasskeyEnrollmentMembers => useMemo(() => instance, []);
