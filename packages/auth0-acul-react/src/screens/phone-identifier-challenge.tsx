import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  PhoneIdentifierChallengeMembers,
  PhoneChallengeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/phone-identifier-challenge';

// Register the singleton instance of PhoneIdentifierChallenge
const instance = registerScreen<PhoneIdentifierChallengeMembers>(PhoneIdentifierChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PhoneIdentifierChallengeMembers>(instance);
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
export const submitPhoneChallenge = (payload: PhoneChallengeOptions) =>
  withError(instance.submitPhoneChallenge(payload));
/**
 * Requests a new verification code for the user's phone number.
 *
 * @remarks
 * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
 * screen again, or the `interstitial-captcha` screen if a captcha is required. Either
 * way the browser loads a new page, and React state, effects, and timers are lost.
 *
 * Code after `await resendCode()` may still run, but anything it sets up, such as a
 * "code sent" message, is gone after the reload. Server-side errors, such as rate
 * limits, appear in `useErrors()` on the reloaded page. They don't reject the
 * returned promise.
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
export const switchToVoice = (payload?: CustomOptions) =>
  withError(instance.switchToVoice(payload));
export const switchToText = (payload?: CustomOptions) => withError(instance.switchToText(payload));
export const switchToPassword = (payload?: CustomOptions) =>
  withError(instance.switchToPassword(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of PhoneIdentifierChallenge
export const usePhoneIdentifierChallenge = (): PhoneIdentifierChallengeMembers =>
  useMemo(() => instance, []);
