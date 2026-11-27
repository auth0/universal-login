import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  EmailOTPChallengeMembers,
  OtpCodeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/email-otp-challenge';

// Register the singleton instance of EmailOTPChallenge
const instance = registerScreen<EmailOTPChallengeMembers>(EmailOTPChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<EmailOTPChallengeMembers>(instance);
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
export const submitCode = (options: OtpCodeOptions) => withError(instance.submitCode(options));
/**
 * Requests a new OTP code to be sent to the user's email.
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
 * @param options - Optional custom parameters to send with the request.
 * @returns A promise that resolves once the form is submitted, before the page
 * reloads. It doesn't confirm that a new code was sent.
 */
export const resendCode = (options?: CustomOptions) => withError(instance.resendCode(options));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of EmailOTPChallenge
export const useEmailOTPChallenge = (): EmailOTPChallengeMembers => useMemo(() => instance, []);
