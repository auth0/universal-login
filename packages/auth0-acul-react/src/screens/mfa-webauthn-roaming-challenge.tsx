import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
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
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of MfaWebAuthnRoamingChallenge
export const useMfaWebAuthnRoamingChallenge = (): MfaWebAuthnRoamingChallengeMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
