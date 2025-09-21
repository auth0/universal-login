import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaLoginOptionsMembers,
  LoginEnrollOptions,
} from '@auth0/auth0-acul-js/mfa-login-options';

// Register the singleton instance of MfaLoginOptions
const instance = registerScreen<MfaLoginOptionsMembers>(MfaLoginOptions)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaLoginOptionsMembers>(instance);
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
export const enroll = (payload: LoginEnrollOptions) => withError(instance.enroll(payload));

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

// Main instance hook. Returns singleton instance of MfaLoginOptions
export const useMfaLoginOptions = (): MfaLoginOptionsMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
