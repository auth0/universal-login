import { useMemo } from 'react';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordEmailMembers, CustomOptions, ScreenMembersOnResetPasswordEmail } from '@auth0/auth0-acul-js/reset-password-email';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordEmailMembers {
  try {
    return getScreen<ResetPasswordEmailMembers>();
  } catch {
    const instance = new ResetPasswordEmail();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordEmailMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordEmail = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const resendEmail = (payload?: CustomOptions) => withError(getInstance().resendEmail(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordEmail
export const useResetPasswordEmail = (): ResetPasswordEmailMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-email';