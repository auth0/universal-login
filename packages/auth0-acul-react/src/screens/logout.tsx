import Logout from '@auth0/auth0-acul-js/logout';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { LogoutMembers, ConfirmLogoutOptions } from '@auth0/auth0-acul-js/logout';

// Register the singleton instance of Logout
const instance = registerScreen<LogoutMembers>(Logout)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LogoutMembers>(instance);
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
export const confirmLogout = (payload: ConfirmLogoutOptions) =>
  withError(instance.confirmLogout(payload));

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

// Main instance hook. Returns singleton instance of Logout
export const useLogout = (): LogoutMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
