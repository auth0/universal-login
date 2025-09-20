import { useMemo } from 'react';
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaPhoneChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaPhoneChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaPhoneChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaPhoneChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaPhoneChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaPhoneChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordMfaPhoneChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaPhoneChallenge
export const useResetPasswordMfaPhoneChallenge = (): ResetPasswordMfaPhoneChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';