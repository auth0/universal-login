import { useMemo } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { ContextHooks } from '../hooks/context';
import type { LoginPasswordlessEmailCodeMembers, SubmitCodeOptions, CustomOptions, ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode } from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginPasswordlessEmailCodeMembers {
  try {
    return getScreen<LoginPasswordlessEmailCodeMembers>();
  } catch {
    const instance = new LoginPasswordlessEmailCode();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitCode = (payload: SubmitCodeOptions) => withError(getInstance().submitCode(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LoginPasswordlessEmailCode
export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login-passwordless-email-code';