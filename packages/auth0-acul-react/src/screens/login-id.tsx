import LoginId from '@auth0/auth0-acul-js/login-id';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  LoginIdMembers,
  LoginOptions,
  FederatedLoginOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/login-id';

// Register the singleton instance of LoginId
const instance = registerScreen<LoginIdMembers>(LoginId)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginIdMembers>(instance);
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
export const passkeyLogin = (payload?: CustomOptions) => withError(instance.passkeyLogin(payload));
export const pickCountryCode = (payload?: CustomOptions) =>
  withError(instance.pickCountryCode(payload));

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

// Main instance hook. Returns singleton instance of LoginId
export const useLoginId = (): LoginIdMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
