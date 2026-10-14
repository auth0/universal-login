import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  EmailIdentifierChallengeMembers,
  EmailChallengeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/email-identifier-challenge';

// Register the singleton instance of EmailIdentifierChallenge
const instance = registerScreen<EmailIdentifierChallengeMembers>(EmailIdentifierChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<EmailIdentifierChallengeMembers>(instance);
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
export const submitEmailChallenge = (payload: EmailChallengeOptions) =>
  withError(instance.submitEmailChallenge(payload));
/**
 * Requests a new verification code for the user's email address.
 *
 * @remarks
 * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
 * screen again, or the `interstitial-captcha` screen if a captcha is required. Either
 * way the browser loads a new page, and React state, effects, and timers are lost.
 *
 * Code after `await resendCode()` may still run, but anything it sets up, such as a
 * "code sent" message, is gone after the reload. If the resend fails, for example
 * because of a rate limit, Auth0 renders this screen again without an error, so that
 * it doesn't reveal whether the user exists. Nothing appears in `useErrors()`, and the
 * returned promise doesn't reject.
 *
 * For a cooldown between resends, use `useResend()`. It stores its countdown in
 * `localStorage`, so the countdown survives the reload. It also disables resending
 * when `screen.data.resendLimitReached` is `true`.
 *
 * @param payload - Optional custom parameters to send with the request.
 * @returns A promise that resolves once the form is submitted, before the new page
 * loads. It doesn't confirm that a new code was sent.
 */
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const returnToPrevious = (payload?: CustomOptions) =>
  withError(instance.returnToPrevious(payload));
export const switchToPassword = (payload?: CustomOptions) =>
  withError(instance.switchToPassword(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of EmailIdentifierChallenge
export const useEmailIdentifierChallenge = (): EmailIdentifierChallengeMembers =>
  useMemo(() => instance, []);
