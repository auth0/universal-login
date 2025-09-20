import { useMemo } from 'react';
import LogoutComplete from '@auth0/auth0-acul-js/logout-complete';
import { ContextHooks } from '../hooks/context';
import type { LogoutCompleteMembers } from '@auth0/auth0-acul-js/logout-complete';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LogoutCompleteMembers {
  try {
    return getScreen<LogoutCompleteMembers>();
  } catch {
    const instance = new LogoutComplete();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<LogoutCompleteMembers>(getInstance);

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

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LogoutComplete
export const useLogoutComplete = (): LogoutCompleteMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/logout-complete';