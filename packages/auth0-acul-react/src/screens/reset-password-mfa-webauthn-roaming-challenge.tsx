import ResetPasswordMfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaWebAuthnRoamingChallengeMembers,
  UseSecurityKeyOptions,
  ShowErrorOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

// Register the singleton instance of ResetPasswordMfaWebAuthnRoamingChallenge
const instance = registerScreen<ResetPasswordMfaWebAuthnRoamingChallengeMembers>(
  ResetPasswordMfaWebAuthnRoamingChallenge
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaWebAuthnRoamingChallengeMembers>(instance);
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
export const useSecurityKey = (options?: UseSecurityKeyOptions) =>
  withError(instance.useSecurityKey(options));
export const showError = (options: ShowErrorOptions) => withError(instance.showError(options));
export const tryAnotherMethod = (options?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(options));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordMfaWebAuthnRoamingChallenge
export const useResetPasswordMfaWebAuthnRoamingChallenge =
  (): ResetPasswordMfaWebAuthnRoamingChallengeMembers => useMemo(() => instance, []);
