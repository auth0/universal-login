import { useMemo } from 'react';
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPhoneChallengeMembers, ContinueOptions, PickPhoneOptions, PickAuthenticatorOptions, ScreenMembersOnMfaPhoneChallenge } from '@auth0/auth0-acul-js/mfa-phone-challenge';
let instance: MfaPhoneChallengeMembers | null = null;
const getInstance = (): MfaPhoneChallengeMembers => {
  if (!instance) {
    instance = new MfaPhoneChallenge();
  }
  return instance;
};

export const useMfaPhoneChallenge = (): MfaPhoneChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaPhoneChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaPhoneChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const pickPhone = (payload?: PickPhoneOptions) => getInstance().pickPhone(payload);
export const tryAnotherMethod = (payload?: PickAuthenticatorOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnMfaPhoneChallenge, ContinueOptions, MfaPhoneChallengeMembers } from '@auth0/auth0-acul-js/mfa-phone-challenge';

export type * from '@auth0/auth0-acul-js/mfa-phone-challenge';