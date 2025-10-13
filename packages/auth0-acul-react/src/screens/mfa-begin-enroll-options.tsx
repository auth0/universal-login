import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaBeginEnrollOptionsMembers,
  MfaEnrollOptions,
} from '@auth0/auth0-acul-js/mfa-begin-enroll-options';

// Register the singleton instance of MfaBeginEnrollOptions
const instance = registerScreen<MfaBeginEnrollOptionsMembers>(MfaBeginEnrollOptions)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaBeginEnrollOptionsMembers>(instance);
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
export const enroll = (payload: MfaEnrollOptions) => withError(instance.enroll(payload));

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

// Main instance hook. Returns singleton instance of MfaBeginEnrollOptions
export const useMfaBeginEnrollOptions = (): MfaBeginEnrollOptionsMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
