import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordRequestMembers,
  ResetPasswordRequestOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-request';

// Register the singleton instance of ResetPasswordRequest
const instance = registerScreen<ResetPasswordRequestMembers>(ResetPasswordRequest)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordRequestMembers>(instance);
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
export const resetPassword = (payload: ResetPasswordRequestOptions) =>
  withError(instance.resetPassword(payload));
export const backToLogin = (payload?: CustomOptions) => withError(instance.backToLogin(payload));

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

// Main instance hook. Returns singleton instance of ResetPasswordRequest
export const useResetPasswordRequest = (): ResetPasswordRequestMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
