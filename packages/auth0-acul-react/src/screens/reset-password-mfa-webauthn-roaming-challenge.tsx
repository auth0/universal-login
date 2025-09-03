import { useMemo } from 'react';
import ResetPasswordMfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaWebAuthnRoamingChallengeMembers, UseSecurityKeyOptions, ShowErrorOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
let instance: ResetPasswordMfaWebAuthnRoamingChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaWebAuthnRoamingChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaWebAuthnRoamingChallenge();
  }
  return instance;
};

export const useResetPasswordMfaWebAuthnRoamingChallenge = (): ResetPasswordMfaWebAuthnRoamingChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMfaWebAuthnRoamingChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const useSecurityKey = (options?: UseSecurityKeyOptions) => getInstance().useSecurityKey(options);
export const showError = (options: ShowErrorOptions) => getInstance().showError(options);
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(options);

export type { ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge, ShowErrorOptions, TryAnotherMethodOptions, ResetPasswordMfaWebAuthnRoamingChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';