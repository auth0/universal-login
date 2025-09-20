import { useMemo } from 'react';
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaVoiceChallengeMembers, ContinueOptions, CustomOptions, StartResendOptions, ScreenMembersOnResetPasswordMfaVoiceChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaVoiceChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaVoiceChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaVoiceChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaVoiceChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnResetPasswordMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const switchToSms = (payload?: CustomOptions) => withError(getInstance().switchToSms(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaVoiceChallenge
export const useResetPasswordMfaVoiceChallenge = (): ResetPasswordMfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';