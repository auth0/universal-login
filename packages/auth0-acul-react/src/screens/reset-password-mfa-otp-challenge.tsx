import { useMemo } from 'react';
import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions } from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaOtpChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaOtpChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaOtpChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaOtpChallengeMembers>(getInstance);

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
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaOtpChallenge
export const useResetPasswordMfaOtpChallenge = (): ResetPasswordMfaOtpChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';