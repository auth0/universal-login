import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordEmailMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-email';

// Register the singleton instance of ResetPasswordEmail
const instance = registerScreen<ResetPasswordEmailMembers>(ResetPasswordEmail)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordEmailMembers>(instance);
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
export const resendEmail = (payload?: CustomOptions) => withError(instance.resendEmail(payload));

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

// Main instance hook. Returns singleton instance of ResetPasswordEmail
export const useResetPasswordEmail = (): ResetPasswordEmailMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
