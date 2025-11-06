import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
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

// Utility Hooks
export { useLoginIdentifiers } from '../hooks/utility/login-identifiers';

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

// Main instance hook. Returns singleton instance of ResetPasswordRequest
export const useResetPasswordRequest = (): ResetPasswordRequestMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
