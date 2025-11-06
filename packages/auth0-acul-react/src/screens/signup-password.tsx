import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  SignupPasswordMembers,
  SignupPasswordOptions,
  FederatedSignupOptions,
  SwitchConnectionOptions,
} from '@auth0/auth0-acul-js/signup-password';

// Register the singleton instance of SignupPassword
const instance = registerScreen<SignupPasswordMembers>(SignupPassword)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<SignupPasswordMembers>(instance);
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
export const signup = (payload: SignupPasswordOptions) => withError(instance.signup(payload));
export const federatedSignup = (payload: FederatedSignupOptions) =>
  withError(instance.federatedSignup(payload));
export const switchConnection = (payload: SwitchConnectionOptions) =>
  withError(instance.switchConnection(payload));

// Utility Hooks
export { usePasswordValidation } from '../hooks/utility/validate-password';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of SignupPassword
export const useSignupPassword = (): SignupPasswordMembers => useMemo(() => instance, []);
