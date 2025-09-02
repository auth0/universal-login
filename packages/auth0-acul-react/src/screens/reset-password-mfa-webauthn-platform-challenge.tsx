import { useMemo } from 'react';
import ResetPasswordMfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaWebAuthnPlatformChallengeMembers, ContinueWithPasskeyOptions, ReportBrowserErrorOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';
let instance: ResetPasswordMfaWebAuthnPlatformChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaWebAuthnPlatformChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaWebAuthnPlatformChallenge();
  }
  return instance;
};

export const useResetPasswordMfaWebAuthnPlatformChallenge = (): ResetPasswordMfaWebAuthnPlatformChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMfaWebAuthnPlatformChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueWithPasskey = (options?: ContinueWithPasskeyOptions) => getInstance().continueWithPasskey(options);
export const reportBrowserError = (options: ReportBrowserErrorOptions) => getInstance().reportBrowserError(options);
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(options);

export type { ScreenMembersOnResetPasswordMfaWebAuthnPlatformChallenge, ReportBrowserErrorOptions, TryAnotherMethodOptions, ResetPasswordMfaWebAuthnPlatformChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';