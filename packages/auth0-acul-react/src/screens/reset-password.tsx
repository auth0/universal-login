import { useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMembers, ResetPasswordOptions, ScreenMembersOnResetPassword, TransactionMembersOnResetPassword } from '@auth0/auth0-acul-js/reset-password';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMembers {
  try {
    return getScreen<ResetPasswordMembers>();
  } catch {
    const instance = new ResetPassword();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnResetPassword = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const resetPassword = (payload: ResetPasswordOptions) => withError(getInstance().resetPassword(payload));

// Utility Hooks
export { usePasswordValidation } from '../hooks/utility/validate-password';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPassword
export const useResetPassword = (): ResetPasswordMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password';