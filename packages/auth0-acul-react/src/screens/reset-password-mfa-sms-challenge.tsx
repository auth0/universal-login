import { useMemo } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaSmsChallengeMembers, MfaSmsChallengeOptions, CustomOptions, StartResendOptions, ScreenMembersOnResetPasswordMfaSmsChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaSmsChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaSmsChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaSmsChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaSmsChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordMfaSmsChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) => withError(getInstance().continueMfaSmsChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));
export const getACall = (payload?: CustomOptions) => withError(getInstance().getACall(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaSmsChallenge
export const useResetPasswordMfaSmsChallenge = (): ResetPasswordMfaSmsChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';