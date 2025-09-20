import { useMemo } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';
import { ContextHooks } from '../hooks/context';
import type { SignupMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignup, TransactionMembersOnSignup } from '@auth0/auth0-acul-js/signup';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): SignupMembers {
  try {
    return getScreen<SignupMembers>();
  } catch {
    const instance = new Signup();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<SignupMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen: () => ScreenMembersOnSignup = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignup = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const signup = (payload: SignupOptions) => withError(getInstance().signup(payload));
export const federatedSignup = (payload: FederatedSignupOptions) => withError(getInstance().federatedSignup(payload));
export const pickCountryCode = (payload?: CustomOptions) => withError(getInstance().pickCountryCode(payload));

// Utility Hooks
export { usePasswordValidation } from '../hooks/utility/validate-password';

// Utility Hooks
export { useEnabledIdentifiers } from '../hooks/utility/enabled-identifiers';

// Utility Hooks
export { useUsernameValidation } from '../hooks/utility/validate-username';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of Signup
export const useSignup = (): SignupMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/signup';