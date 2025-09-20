import { useMemo } from 'react';
import LogoutAborted from '@auth0/auth0-acul-js/logout-aborted';
import { ContextHooks } from '../hooks/context';
import type { LogoutAbortedMembers } from '@auth0/auth0-acul-js/logout-aborted';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LogoutAbortedMembers {
  try {
    return getScreen<LogoutAbortedMembers>();
  } catch {
    const instance = new LogoutAborted();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<LogoutAbortedMembers>(getInstance);

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

// Main instance hook. Returns singleton instance of LogoutAborted
export const useLogoutAborted = (): LogoutAbortedMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/logout-aborted';