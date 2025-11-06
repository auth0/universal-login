import MfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnPlatformChallengeMembers,
  VerifyPlatformAuthenticatorOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

// Register the singleton instance of MfaWebAuthnPlatformChallenge
const instance = registerScreen<MfaWebAuthnPlatformChallengeMembers>(MfaWebAuthnPlatformChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnPlatformChallengeMembers>(instance);
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
export const verify = (options?: VerifyPlatformAuthenticatorOptions) =>
  withError(instance.verify(options));
export const reportBrowserError = (options: ReportBrowserErrorOptions) =>
  withError(instance.reportBrowserError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(options));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of MfaWebAuthnPlatformChallenge
export const useMfaWebAuthnPlatformChallenge = (): MfaWebAuthnPlatformChallengeMembers =>
  useMemo(() => instance, []);
