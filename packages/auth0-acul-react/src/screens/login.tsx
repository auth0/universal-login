import Login from '@auth0/auth0-acul-js/login';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type { LoginMembers, LoginOptions, FederatedLoginOptions } from '@auth0/auth0-acul-js/login';

// Register the singleton instance of Login
const instance = registerScreen<LoginMembers>(Login)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginMembers>(instance);
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
export const login = (payload: LoginOptions) => withError(instance.login(payload));
export const federatedLogin = (payload: FederatedLoginOptions) =>
  withError(instance.federatedLogin(payload));

// Utility Hooks
export { useActiveIdentifiers } from '../hooks/utility/active-identifiers';

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

// Main instance hook. Returns singleton instance of Login
export const useLogin = (): LoginMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
