import { useMemo } from 'react';
import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnRoamingChallengeMembers, VerifySecurityKeyOptions, ReportWebAuthnErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnRoamingChallenge } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
let instance: MfaWebAuthnRoamingChallengeMembers | null = null;
const getInstance = (): MfaWebAuthnRoamingChallengeMembers => {
  if (!instance) {
    instance = new MfaWebAuthnRoamingChallenge();
  }
  return instance;
};

export const useMfaWebAuthnRoamingChallenge = (): MfaWebAuthnRoamingChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaWebAuthnRoamingChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaWebAuthnRoamingChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const verify = (options?: VerifySecurityKeyOptions) => getInstance().verify(options);
export const reportWebAuthnError = (options: ReportWebAuthnErrorOptions) => getInstance().reportWebAuthnError(options);
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(options);

export type { ScreenMembersOnMfaWebAuthnRoamingChallenge, VerifySecurityKeyOptions, TryAnotherMethodOptions, MfaWebAuthnRoamingChallengeMembers } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';