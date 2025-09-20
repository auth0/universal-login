import { useMemo } from 'react';
import Login from '@auth0/auth0-acul-js/login';
import { ContextHooks } from '../hooks/context';
import type { LoginMembers, LoginOptions, FederatedLoginOptions, ScreenMembersOnLogin, TransactionMembersOnLogin } from '@auth0/auth0-acul-js/login';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginMembers {
  try {
    return getScreen<LoginMembers>();
  } catch {
    const instance = new Login();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LoginMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnLogin = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLogin = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const login = (payload: LoginOptions) => withError(getInstance().login(payload));
export const federatedLogin = (payload: FederatedLoginOptions) => withError(getInstance().federatedLogin(payload));

// Utility Hooks
export { useActiveIdentifiers } from '../hooks/utility/active-identifiers';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of Login
export const useLogin = (): LoginMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login';