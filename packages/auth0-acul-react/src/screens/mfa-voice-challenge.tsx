import { useMemo } from 'react';
import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { setScreen, getScreen } from '../state/instance-store';

import type { MfaVoiceChallengeMembers, MfaVoiceChallengeContinueOptions, CustomOptions, ScreenMembersOnMfaVoiceChallenge } from '@auth0/auth0-acul-js/mfa-voice-challenge';
function getInstance(): MfaVoiceChallenge {
  try {
    return getScreen<MfaVoiceChallenge>();
  } catch {
    const inst = new MfaVoiceChallenge();
    setScreen(inst);
    return inst;
  }
}


export const useMfaVoiceChallenge = (): MfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: MfaVoiceChallengeContinueOptions) => getInstance().continue(payload);
export const pickPhone = (payload?: CustomOptions) => getInstance().pickPhone(payload);
export const switchToSms = (payload?: CustomOptions) => getInstance().switchToSms(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

// Resend hook
export { useResend };

export type { MfaVoiceChallengeContinueOptions, ScreenMembersOnMfaVoiceChallenge, MfaVoiceChallengeMembers, UntrustedDataMembersOnMfaVoiceChallenge } from '@auth0/auth0-acul-js/mfa-voice-challenge';

export type * from '@auth0/auth0-acul-js/mfa-voice-challenge';