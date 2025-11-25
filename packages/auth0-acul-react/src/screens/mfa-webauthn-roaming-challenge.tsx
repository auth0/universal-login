import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnRoamingChallengeMembers,
  VerifySecurityKeyOptions,
  ReportWebAuthnErrorOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

// Register the singleton instance of MfaWebAuthnRoamingChallenge
const instance = registerScreen<MfaWebAuthnRoamingChallengeMembers>(MfaWebAuthnRoamingChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnRoamingChallengeMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const verify = (options?: VerifySecurityKeyOptions) => withError(instance.verify(options));
export const reportWebAuthnError = (options: ReportWebAuthnErrorOptions) =>
  withError(instance.reportWebAuthnError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(options));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaWebAuthnRoamingChallenge
export const useMfaWebAuthnRoamingChallenge = (): MfaWebAuthnRoamingChallengeMembers =>
  useMemo(() => instance, []);
