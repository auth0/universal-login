import Signup from '@auth0/auth0-acul-js/signup';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  SignupMembers,
  SignupOptions,
  FederatedSignupOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/signup';

// Register the singleton instance of Signup
const instance = registerScreen<SignupMembers>(Signup)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<SignupMembers>(instance);
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
export { usePasswordValidation } from '../hooks/utility/validate-password';

// Utility Hooks
export { useSignupIdentifiers } from '../hooks/utility/signup-identifiers';

// Utility Hooks
export { useUsernameValidation } from '../hooks/utility/validate-username';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of Signup
export const useSignup = (): SignupMembers => useMemo(() => instance, []);
