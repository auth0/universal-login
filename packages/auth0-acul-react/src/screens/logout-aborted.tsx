import LogoutAborted from '@auth0/auth0-acul-js/logout-aborted';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { LogoutAbortedMembers } from '@auth0/auth0-acul-js/logout-aborted';

// Register the singleton instance of LogoutAborted
const instance = registerScreen<LogoutAbortedMembers>(LogoutAborted)!;

// Context hooks
const factory = new ContextHooks<LogoutAbortedMembers>(instance);
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
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of LogoutAborted
export const useLogoutAborted = (): LogoutAbortedMembers => useMemo(() => instance, []);
