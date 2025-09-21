import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMembers,
  ResetPasswordOptions,
} from '@auth0/auth0-acul-js/reset-password';

// Register the singleton instance of ResetPassword
const instance = registerScreen<ResetPasswordMembers>(ResetPassword)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMembers>(instance);
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
export const resetPassword = (payload: ResetPasswordOptions) =>
  withError(instance.resetPassword(payload));

// Utility Hooks
export { usePasswordValidation } from '../hooks/utility/validate-password';

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

// Main instance hook. Returns singleton instance of ResetPassword
export const useResetPassword = (): ResetPasswordMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
