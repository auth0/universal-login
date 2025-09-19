import { useMemo } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { setScreen, getScreen } from '../state/instance-store';

import type { ResetPasswordMfaSmsChallengeMembers, MfaSmsChallengeOptions, CustomOptions, ScreenMembersOnResetPasswordMfaSmsChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
function getInstance(): ResetPasswordMfaSmsChallenge {
  try {
    return getScreen<ResetPasswordMfaSmsChallenge>();
  } catch {
    const inst = new ResetPasswordMfaSmsChallenge();
    setScreen(inst);
    return inst;
  }
}

export const useResetPasswordMfaSmsChallenge = (): ResetPasswordMfaSmsChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnResetPasswordMfaSmsChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) => getInstance().continueMfaSmsChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const getACall = (payload?: CustomOptions) => getInstance().getACall(payload);

// Resend hook
export { useResend };

export type { MfaSmsChallengeOptions, ScreenMembersOnResetPasswordMfaSmsChallenge, ResetPasswordMfaSmsChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';