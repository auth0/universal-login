import ResetPasswordMfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaWebAuthnPlatformChallengeMembers,
  ContinueWithPasskeyOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

// Register the singleton instance of ResetPasswordMfaWebAuthnPlatformChallenge
const instance = registerScreen<ResetPasswordMfaWebAuthnPlatformChallengeMembers>(
  ResetPasswordMfaWebAuthnPlatformChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaWebAuthnPlatformChallengeMembers>(instance);
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
export const continueWithPasskey = (options?: ContinueWithPasskeyOptions) =>
  withError(instance.continueWithPasskey(options));
export const reportBrowserError = (options: ReportBrowserErrorOptions) =>
  withError(instance.reportBrowserError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(options));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordMfaWebAuthnPlatformChallenge
export const useResetPasswordMfaWebAuthnPlatformChallenge =
  (): ResetPasswordMfaWebAuthnPlatformChallengeMembers => useMemo(() => instance, []);
