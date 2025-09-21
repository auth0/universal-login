import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  LoginPasswordlessEmailCodeMembers,
  SubmitCodeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/login-passwordless-email-code';

// Register the singleton instance of LoginPasswordlessEmailCode
const instance = registerScreen<LoginPasswordlessEmailCodeMembers>(LoginPasswordlessEmailCode)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(instance);
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
export const submitCode = (payload: SubmitCodeOptions) => withError(instance.submitCode(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));

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

// Main instance hook. Returns singleton instance of LoginPasswordlessEmailCode
export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
