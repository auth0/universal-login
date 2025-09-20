import { useMemo } from 'react';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
import { ContextHooks } from '../hooks/context';
import type { MfaEmailListMembers, SelectMfaEmailOptions, CustomOptions, ScreenMembersOnMfaEmailList } from '@auth0/auth0-acul-js/mfa-email-list';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaEmailListMembers {
  try {
    return getScreen<MfaEmailListMembers>();
  } catch {
    const instance = new MfaEmailList();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaEmailListMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaEmailList = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const selectMfaEmail = (payload: SelectMfaEmailOptions) => withError(getInstance().selectMfaEmail(payload));
export const goBack = (payload?: CustomOptions) => withError(getInstance().goBack(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaEmailList
export const useMfaEmailList = (): MfaEmailListMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-email-list';