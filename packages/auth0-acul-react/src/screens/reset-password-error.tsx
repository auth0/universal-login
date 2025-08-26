import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { ResetPasswordErrorMembers } from '@auth0/auth0-acul-js/reset-password-error';

// Register the singleton instance of ResetPasswordError
const instance = registerScreen<ResetPasswordErrorMembers>(ResetPasswordError)!;

// Context hooks
const factory = new ContextHooks<ResetPasswordErrorMembers>(instance);
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
  type ErrorKind,
} from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordError
export const useResetPasswordError = (): ResetPasswordErrorMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
