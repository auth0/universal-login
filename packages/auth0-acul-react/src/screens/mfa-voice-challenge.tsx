import { useMemo } from 'react';
import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaVoiceChallengeMembers, MfaVoiceChallengeContinueOptions, CustomOptions, StartResendOptions, ScreenMembersOnMfaVoiceChallenge } from '@auth0/auth0-acul-js/mfa-voice-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaVoiceChallengeMembers {
  try {
    return getScreen<MfaVoiceChallengeMembers>();
  } catch {
    const instance = new MfaVoiceChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaVoiceChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: MfaVoiceChallengeContinueOptions) => withError(getInstance().continue(payload));
export const pickPhone = (payload?: CustomOptions) => withError(getInstance().pickPhone(payload));
export const switchToSms = (payload?: CustomOptions) => withError(getInstance().switchToSms(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaVoiceChallenge
export const useMfaVoiceChallenge = (): MfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-voice-challenge';