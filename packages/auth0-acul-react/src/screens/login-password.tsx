import LoginPassword from '@auth0/auth0-acul-js/login-password';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  LoginPasswordMembers,
  LoginPasswordOptions,
  FederatedLoginOptions,
  SwitchConnectionOptions,
} from '@auth0/auth0-acul-js/login-password';

// Register the singleton instance of LoginPassword
const instance = registerScreen<LoginPasswordMembers>(LoginPassword)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginPasswordMembers>(instance);
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
export const login = (payload: LoginPasswordOptions) => withError(instance.login(payload));
export const federatedLogin = (payload: FederatedLoginOptions) =>
  withError(instance.federatedLogin(payload));
export const switchConnection = (payload: SwitchConnectionOptions) =>
  withError(instance.switchConnection(payload));

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

// Main instance hook. Returns singleton instance of LoginPassword
export const useLoginPassword = (): LoginPasswordMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
