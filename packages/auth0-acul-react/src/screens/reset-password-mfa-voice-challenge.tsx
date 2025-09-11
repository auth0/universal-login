import { useMemo } from 'react';
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { ResetPasswordMfaVoiceChallengeMembers, ContinueOptions, CustomOptions, ScreenMembersOnResetPasswordMfaVoiceChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
let instance: ResetPasswordMfaVoiceChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaVoiceChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaVoiceChallenge();
  }
  return instance;
};

export const useResetPasswordMfaVoiceChallenge = (): ResetPasswordMfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnResetPasswordMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const switchToSms = (payload?: CustomOptions) => getInstance().switchToSms(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

// Resend hook
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnResetPasswordMfaVoiceChallenge, ContinueOptions, ResetPasswordMfaVoiceChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';