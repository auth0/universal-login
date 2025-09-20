import { useMemo } from 'react';
import LoginId from '@auth0/auth0-acul-js/login-id';
import { ContextHooks } from '../hooks/context';
import type { LoginIdMembers, LoginOptions, FederatedLoginOptions, CustomOptions, ScreenMembersOnLoginId, TransactionMembersOnLoginId } from '@auth0/auth0-acul-js/login-id';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginIdMembers {
  try {
    return getScreen<LoginIdMembers>();
  } catch {
    const instance = new LoginId();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LoginIdMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnLoginId = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginId = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const login = (payload: LoginOptions) => withError(getInstance().login(payload));
export const federatedLogin = (payload: FederatedLoginOptions) => withError(getInstance().federatedLogin(payload));
export const passkeyLogin = (payload?: CustomOptions) => withError(getInstance().passkeyLogin(payload));
export const pickCountryCode = (payload?: CustomOptions) => withError(getInstance().pickCountryCode(payload));

// Utility Hooks
export { useActiveIdentifiers } from '../hooks/utility/active-identifiers';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LoginId
export const useLoginId = (): LoginIdMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login-id';