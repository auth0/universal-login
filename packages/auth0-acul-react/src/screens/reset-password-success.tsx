import { useMemo } from 'react';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordSuccessMembers, ScreenMembersOnResetPasswordSuccess } from '@auth0/auth0-acul-js/reset-password-success';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordSuccessMembers {
  try {
    return getScreen<ResetPasswordSuccessMembers>();
  } catch {
    const instance = new ResetPasswordSuccess();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<ResetPasswordSuccessMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordSuccess = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordSuccess
export const useResetPasswordSuccess = (): ResetPasswordSuccessMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-success';