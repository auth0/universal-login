import { useMemo } from 'react';
import ResetPasswordMfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaWebAuthnRoamingChallengeMembers, UseSecurityKeyOptions, ShowErrorOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaWebAuthnRoamingChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaWebAuthnRoamingChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaWebAuthnRoamingChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnResetPasswordMfaWebAuthnRoamingChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const useSecurityKey = (options?: UseSecurityKeyOptions) => withError(getInstance().useSecurityKey(options));
export const showError = (options: ShowErrorOptions) => withError(getInstance().showError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(options));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaWebAuthnRoamingChallenge
export const useResetPasswordMfaWebAuthnRoamingChallenge = (): ResetPasswordMfaWebAuthnRoamingChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';