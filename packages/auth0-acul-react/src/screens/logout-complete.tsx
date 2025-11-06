import LogoutComplete from '@auth0/auth0-acul-js/logout-complete';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { LogoutCompleteMembers } from '@auth0/auth0-acul-js/logout-complete';

// Register the singleton instance of LogoutComplete
const instance = registerScreen<LogoutCompleteMembers>(LogoutComplete)!;

// Context hooks
const factory = new ContextHooks<LogoutCompleteMembers>(instance);
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

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of LogoutComplete
export const useLogoutComplete = (): LogoutCompleteMembers => useMemo(() => instance, []);
