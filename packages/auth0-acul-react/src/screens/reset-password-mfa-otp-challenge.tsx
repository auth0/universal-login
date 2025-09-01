import { useMemo } from 'react';
import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions } from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
let instance: ResetPasswordMfaOtpChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaOtpChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaOtpChallenge();
  }
  return instance;
};

export const useResetPasswordMfaOtpChallenge = (): ResetPasswordMfaOtpChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ContinueOptions, TryAnotherMethodOptions, ResetPasswordMfaOtpChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';