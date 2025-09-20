import { useMemo } from 'react';
import Logout from '@auth0/auth0-acul-js/logout';
import { ContextHooks } from '../hooks/context';
import type { LogoutMembers, ConfirmLogoutOptions } from '@auth0/auth0-acul-js/logout';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LogoutMembers {
  try {
    return getScreen<LogoutMembers>();
  } catch {
    const instance = new Logout();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LogoutMembers>(getInstance);

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
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const confirmLogout = (payload: ConfirmLogoutOptions) => withError(getInstance().confirmLogout(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of Logout
export const useLogout = (): LogoutMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/logout';