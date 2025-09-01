import { useMemo } from 'react';
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpChallenge } from '@auth0/auth0-acul-js/mfa-otp-challenge';
let instance: MfaOtpChallengeMembers | null = null;
const getInstance = (): MfaOtpChallengeMembers => {
  if (!instance) {
    instance = new MfaOtpChallenge();
  }
  return instance;
};

export const useMfaOtpChallenge = (): MfaOtpChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaOtpChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaOtpChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnMfaOtpChallenge, UntrustedDataMembersOnMfaOtpChallenge, ContinueOptions, TryAnotherMethodOptions, MfaOtpChallengeMembers } from '@auth0/auth0-acul-js/mfa-otp-challenge';

export type * from '@auth0/auth0-acul-js/mfa-otp-challenge';