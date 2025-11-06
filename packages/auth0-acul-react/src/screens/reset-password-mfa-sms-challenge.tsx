import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

// Register the singleton instance of ResetPasswordMfaSmsChallenge
const instance = registerScreen<ResetPasswordMfaSmsChallengeMembers>(ResetPasswordMfaSmsChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaSmsChallengeMembers>(instance);
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
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) =>
  withError(instance.continueMfaSmsChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const getACall = (payload?: CustomOptions) => withError(instance.getACall(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordMfaSmsChallenge
export const useResetPasswordMfaSmsChallenge = (): ResetPasswordMfaSmsChallengeMembers =>
  useMemo(() => instance, []);
