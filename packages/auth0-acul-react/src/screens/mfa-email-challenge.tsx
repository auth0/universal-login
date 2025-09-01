import { useMemo } from 'react';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ScreenMembersOnMfaEmailChallenge } from '@auth0/auth0-acul-js/mfa-email-challenge';
let instance: MfaEmailChallengeMembers | null = null;
const getInstance = (): MfaEmailChallengeMembers => {
  if (!instance) {
    instance = new MfaEmailChallenge();
  }
  return instance;
};

export const useMfaEmailChallenge = (): MfaEmailChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaEmailChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaEmailChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnMfaEmailChallenge, UntrustedDataMembersOnMfaEmailChallenge, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, MfaEmailChallengeMembers } from '@auth0/auth0-acul-js/mfa-email-challenge';

export type * from '@auth0/auth0-acul-js/mfa-email-challenge';