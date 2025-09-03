import { useMemo } from 'react';
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaPhoneChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaPhoneChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
let instance: ResetPasswordMfaPhoneChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaPhoneChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaPhoneChallenge();
  }
  return instance;
};

export const useResetPasswordMfaPhoneChallenge = (): ResetPasswordMfaPhoneChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnResetPasswordMfaPhoneChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnResetPasswordMfaPhoneChallenge, ContinueOptions, TryAnotherMethodOptions, ResetPasswordMfaPhoneChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';