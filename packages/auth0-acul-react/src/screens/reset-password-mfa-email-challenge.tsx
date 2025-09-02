import { useMemo } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaEmailChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
let instance: ResetPasswordMfaEmailChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaEmailChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaEmailChallenge();
  }
  return instance;
};

export const useResetPasswordMfaEmailChallenge = (): ResetPasswordMfaEmailChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnResetPasswordMfaEmailChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnResetPasswordMfaEmailChallenge, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ResetPasswordMfaEmailChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';