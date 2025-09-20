import { useMemo } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { ContextHooks } from '../hooks/context';
import type { SignupIdMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignupId, TransactionMembersOnSignupId } from '@auth0/auth0-acul-js/signup-id';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): SignupIdMembers {
  try {
    return getScreen<SignupIdMembers>();
  } catch {
    const instance = new SignupId();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<SignupIdMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnSignupId = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupId = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const signup = (payload: SignupOptions) => withError(getInstance().signup(payload));
export const federatedSignup = (payload: FederatedSignupOptions) => withError(getInstance().federatedSignup(payload));
export const pickCountryCode = (payload?: CustomOptions) => withError(getInstance().pickCountryCode(payload));

// Utility Hooks
export { useEnabledIdentifiers } from '../hooks/utility/enabled-identifiers';

// Utility Hooks
export { useUsernameValidation } from '../hooks/utility/validate-username';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of SignupId
export const useSignupId = (): SignupIdMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/signup-id';