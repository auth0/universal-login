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
  useExperiment,
} = factory;

// Submit functions
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) =>
  withError(instance.continueMfaSmsChallenge(payload));
/**
 * Resends the SMS code.
 *
 * @remarks
 * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
 * screen again, so the browser reloads the page and React state, effects, and timers
 * are lost.
 *
 * Code after `await resendCode()` may still run, but anything it sets up, such as a
 * "code sent" message, is gone after the reload. Server-side errors, such as rate
 * limits, appear in `useErrors()` on the reloaded page. They don't reject the
 * returned promise.
 *
 * For a cooldown between resends, use `useResend()`. It stores its countdown in
 * `localStorage`, so the countdown survives the reload.
 *
 * @param payload - Optional custom parameters to send with the request.
 * @returns A promise that resolves once the form is submitted, before the page
 * reloads. It doesn't confirm that a new code was sent.
 */
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const getACall = (payload?: CustomOptions) => withError(instance.getACall(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordMfaSmsChallenge
export const useResetPasswordMfaSmsChallenge = (): ResetPasswordMfaSmsChallengeMembers =>
  useMemo(() => instance, []);
