import { useMemo } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { ContextHooks } from '../hooks/context';
import type { SignupPasswordMembers, SignupPasswordOptions, FederatedSignupOptions, ScreenMembersOnSignupPassword, TransactionMembersOnSignupPassword } from '@auth0/auth0-acul-js/signup-password';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): SignupPasswordMembers {
  try {
    return getScreen<SignupPasswordMembers>();
  } catch {
    const instance = new SignupPassword();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<SignupPasswordMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnSignupPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupPassword = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const signup = (payload: SignupPasswordOptions) => withError(getInstance().signup(payload));
export const federatedSignup = (payload: FederatedSignupOptions) => withError(getInstance().federatedSignup(payload));

// Utility Hooks
export { usePasswordValidation } from '../hooks/utility/validate-password';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of SignupPassword
export const useSignupPassword = (): SignupPasswordMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/signup-password';