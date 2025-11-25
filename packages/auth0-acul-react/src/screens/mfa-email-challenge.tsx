import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-email-challenge';

// Register the singleton instance of MfaEmailChallenge
const instance = registerScreen<MfaEmailChallengeMembers>(MfaEmailChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaEmailChallengeMembers>(instance);
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
export const continueMethod = (payload: ContinueOptions) => withError(instance.continue(payload));
export const resendCode = (payload?: ResendCodeOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const pickEmail = (payload?: CustomOptions) => withError(instance.pickEmail(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaEmailChallenge
export const useMfaEmailChallenge = (): MfaEmailChallengeMembers => useMemo(() => instance, []);
