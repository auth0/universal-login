import { useMemo } from 'react';
import LoginPassword from '@auth0/auth0-acul-js/login-password';
import { ContextHooks } from '../hooks/context';
import type { LoginPasswordMembers, LoginPasswordOptions, FederatedLoginOptions, ScreenMembersOnLoginPassword, TransactionMembersOnLoginPassword } from '@auth0/auth0-acul-js/login-password';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginPasswordMembers {
  try {
    return getScreen<LoginPasswordMembers>();
  } catch {
    const instance = new LoginPassword();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LoginPasswordMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnLoginPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPassword = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const login = (payload: LoginPasswordOptions) => withError(getInstance().login(payload));
export const federatedLogin = (payload: FederatedLoginOptions) => withError(getInstance().federatedLogin(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LoginPassword
export const useLoginPassword = (): LoginPasswordMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login-password';