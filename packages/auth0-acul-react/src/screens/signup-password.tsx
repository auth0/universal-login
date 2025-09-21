import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  SignupPasswordMembers,
  SignupPasswordOptions,
  FederatedSignupOptions,
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

// Main instance hook. Returns singleton instance of SignupPassword
export const useSignupPassword = (): SignupPasswordMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
