import { useMemo } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, StartResendOptions, ScreenMembersOnResetPasswordMfaEmailChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaEmailChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaEmailChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaEmailChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaEmailChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordMfaEmailChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const resendCode = (payload?: ResendCodeOptions) => withError(getInstance().resendCode(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaEmailChallenge
export const useResetPasswordMfaEmailChallenge = (): ResetPasswordMfaEmailChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';