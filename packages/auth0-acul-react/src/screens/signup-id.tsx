import SignupId from '@auth0/auth0-acul-js/signup-id';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  SignupIdMembers,
  SignupOptions,
  FederatedSignupOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/signup-id';

// Register the singleton instance of SignupId
const instance = registerScreen<SignupIdMembers>(SignupId)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<SignupIdMembers>(instance);
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
export const signup = (payload: SignupOptions) => withError(instance.signup(payload));
export const federatedSignup = (payload: FederatedSignupOptions) =>
  withError(instance.federatedSignup(payload));
export const pickCountryCode = (payload?: CustomOptions) =>
  withError(instance.pickCountryCode(payload));

// Utility Hooks
export { useEnabledIdentifiers } from '../hooks/utility/enabled-identifiers';

// Utility Hooks
export { useUsernameValidation } from '../hooks/utility/validate-username';

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

// Main instance hook. Returns singleton instance of SignupId
export const useSignupId = (): SignupIdMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
