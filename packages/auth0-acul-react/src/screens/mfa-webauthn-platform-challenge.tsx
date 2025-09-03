import { useMemo } from 'react';
import MfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnPlatformChallengeMembers, VerifyPlatformAuthenticatorOptions, ReportBrowserErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnPlatformChallenge } from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
let instance: MfaWebAuthnPlatformChallengeMembers | null = null;
const getInstance = (): MfaWebAuthnPlatformChallengeMembers => {
  if (!instance) {
    instance = new MfaWebAuthnPlatformChallenge();
  }
  return instance;
};

export const useMfaWebAuthnPlatformChallenge = (): MfaWebAuthnPlatformChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaWebAuthnPlatformChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaWebAuthnPlatformChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const verify = (options?: VerifyPlatformAuthenticatorOptions) => getInstance().verify(options);
export const reportBrowserError = (options: ReportBrowserErrorOptions) => getInstance().reportBrowserError(options);
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(options);

export type { ScreenMembersOnMfaWebAuthnPlatformChallenge, VerifyPlatformAuthenticatorOptions, ReportBrowserErrorOptions, TryAnotherMethodOptions, MfaWebAuthnPlatformChallengeMembers } from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';