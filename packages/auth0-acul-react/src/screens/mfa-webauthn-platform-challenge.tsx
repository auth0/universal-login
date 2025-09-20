import { useMemo } from 'react';
import MfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnPlatformChallengeMembers, VerifyPlatformAuthenticatorOptions, ReportBrowserErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnPlatformChallenge } from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnPlatformChallengeMembers {
  try {
    return getScreen<MfaWebAuthnPlatformChallengeMembers>();
  } catch {
    const instance = new MfaWebAuthnPlatformChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnMfaWebAuthnPlatformChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const verify = (options?: VerifyPlatformAuthenticatorOptions) => withError(getInstance().verify(options));
export const reportBrowserError = (options: ReportBrowserErrorOptions) => withError(getInstance().reportBrowserError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(options));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnPlatformChallenge
export const useMfaWebAuthnPlatformChallenge = (): MfaWebAuthnPlatformChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';