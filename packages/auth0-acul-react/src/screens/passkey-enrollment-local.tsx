import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
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
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of PasskeyEnrollmentLocal
export const usePasskeyEnrollmentLocal = (): PasskeyEnrollmentLocalMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
