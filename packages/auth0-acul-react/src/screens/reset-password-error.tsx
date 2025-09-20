import { useMemo } from 'react';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordErrorMembers, ScreenMembersOnResetPasswordError } from '@auth0/auth0-acul-js/reset-password-error';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordErrorMembers {
  try {
    return getScreen<ResetPasswordErrorMembers>();
  } catch {
    const instance = new ResetPasswordError();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<ResetPasswordErrorMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordError = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordError
export const useResetPasswordError = (): ResetPasswordErrorMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-error';