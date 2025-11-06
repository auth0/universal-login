import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { MfaEnrollResultMembers } from '@auth0/auth0-acul-js/mfa-enroll-result';

// Register the singleton instance of MfaEnrollResult
const instance = registerScreen<MfaEnrollResultMembers>(MfaEnrollResult)!;

// Context hooks
const factory = new ContextHooks<MfaEnrollResultMembers>(instance);
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

// Main instance hook. Returns singleton instance of MfaEnrollResult
export const useMfaEnrollResult = (): MfaEnrollResultMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
