import { useMemo } from 'react';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaSmsChallengeMembers, MfaSmsChallengeOptions, CustomOptions, ScreenMembersOnMfaSmsChallenge } from '@auth0/auth0-acul-js/mfa-sms-challenge';
let instance: MfaSmsChallengeMembers | null = null;
const getInstance = (): MfaSmsChallengeMembers => {
  if (!instance) {
    instance = new MfaSmsChallenge();
  }
  return instance;
};

export const useMfaSmsChallenge = (): MfaSmsChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaSmsChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaSmsChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) => getInstance().continueMfaSmsChallenge(payload);
export const pickSms = (payload?: CustomOptions) => getInstance().pickSms(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const getACall = (payload?: CustomOptions) => getInstance().getACall(payload);

export type { MfaSmsChallengeOptions, ScreenMembersOnMfaSmsChallenge, MfaSmsChallengeMembers, UntrustedDataMembersOnMfaSmsChallenge } from '@auth0/auth0-acul-js/mfa-sms-challenge';

export type * from '@auth0/auth0-acul-js/mfa-sms-challenge';