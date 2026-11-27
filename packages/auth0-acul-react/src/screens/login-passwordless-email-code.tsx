import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  LoginPasswordlessEmailCodeMembers,
  SubmitCodeOptions,
  CustomOptions,
  SwitchConnectionOptions,
} from '@auth0/auth0-acul-js/login-passwordless-email-code';

// Register the singleton instance of LoginPasswordlessEmailCode
const instance = registerScreen<LoginPasswordlessEmailCodeMembers>(LoginPasswordlessEmailCode)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(instance);
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
export const submitCode = (payload: SubmitCodeOptions) => withError(instance.submitCode(payload));
/**
 * Requests a new one-time code for the user's email address.
 *
 * @remarks
 * Submits a form POST with `action: "resend"`. Auth0 responds by rendering this
 * screen again. If a captcha is required, it sends the user back to the `login-id`
 * screen instead (`signup-id` if the user started from signup) to complete the
 * captcha. Either way the browser loads a new page, and React state, effects, and
 * timers are lost.
 *
 * Code after `await resendCode()` may still run, but anything it sets up, such as a
 * "code sent" message, is gone after the reload. If the email can't be sent, for
 * example because of a rate limit, Auth0 renders this screen again without an error.
 * Only extensibility errors (such as an error from an Action) and unexpected failures
 * appear in `useErrors()` on the reloaded page. The returned promise doesn't reject.
 *
 * For a cooldown between resends, use `useResend()`. It stores its countdown in
 * `localStorage`, so the countdown survives the reload.
 *
 * @param payload - Optional custom parameters to send with the request.
 * @returns A promise that resolves once the form is submitted, before the new page
 * loads. It doesn't confirm that a new code was sent.
 */
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const switchConnection = (payload: SwitchConnectionOptions) =>
  withError(instance.switchConnection(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of LoginPasswordlessEmailCode
export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers =>
  useMemo(() => instance, []);
