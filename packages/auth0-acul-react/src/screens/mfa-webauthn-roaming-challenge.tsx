import { useMemo } from 'react';
import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnRoamingChallengeMembers, VerifySecurityKeyOptions, ReportWebAuthnErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnRoamingChallenge } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnRoamingChallengeMembers {
  try {
    return getScreen<MfaWebAuthnRoamingChallengeMembers>();
  } catch {
    const instance = new MfaWebAuthnRoamingChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnMfaWebAuthnRoamingChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const verify = (options?: VerifySecurityKeyOptions) => withError(getInstance().verify(options));
export const reportWebAuthnError = (options: ReportWebAuthnErrorOptions) => withError(getInstance().reportWebAuthnError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(options));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnRoamingChallenge
export const useMfaWebAuthnRoamingChallenge = (): MfaWebAuthnRoamingChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';