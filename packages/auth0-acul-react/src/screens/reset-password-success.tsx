import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { ResetPasswordSuccessMembers } from '@auth0/auth0-acul-js/reset-password-success';

// Register the singleton instance of ResetPasswordSuccess
const instance = registerScreen<ResetPasswordSuccessMembers>(ResetPasswordSuccess)!;

// Context hooks
const factory = new ContextHooks<ResetPasswordSuccessMembers>(instance);
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

// Main instance hook. Returns singleton instance of ResetPasswordSuccess
export const useResetPasswordSuccess = (): ResetPasswordSuccessMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
