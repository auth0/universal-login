import { useMemo } from 'react';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordRequestMembers, ResetPasswordRequestOptions, CustomOptions, ScreenMembersOnResetPasswordRequest, TransactionMembersOnResetPasswordRequest } from '@auth0/auth0-acul-js/reset-password-request';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordRequestMembers {
  try {
    return getScreen<ResetPasswordRequestMembers>();
  } catch {
    const instance = new ResetPasswordRequest();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordRequestMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordRequest = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnResetPasswordRequest = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const resetPassword = (payload: ResetPasswordRequestOptions) => withError(getInstance().resetPassword(payload));
export const backToLogin = (payload?: CustomOptions) => withError(getInstance().backToLogin(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordRequest
export const useResetPasswordRequest = (): ResetPasswordRequestMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-request';