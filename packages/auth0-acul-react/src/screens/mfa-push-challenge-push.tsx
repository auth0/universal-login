import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPushChallengePushMembers,
  WithRememberOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-push-challenge-push';

// Register the singleton instance of MfaPushChallengePush
const instance = registerScreen<MfaPushChallengePushMembers>(MfaPushChallengePush)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPushChallengePushMembers>(instance);
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
export const continueMethod = (payload?: WithRememberOptions) =>
  withError(instance.continue(payload));
/**
 * Resends the push notification.
 *
 * @remarks
 * Submits a form POST with `action: "resend"`. Auth0 sends a new push notification
 * and renders this screen again. The browser reloads the page, and React state,
 * effects, timers, and active polling are lost.
 *
 * Code after `await resendPushNotification()` may still run, but anything it sets up,
 * such as a "notification sent" message, is gone after the reload. Server-side errors
 * appear in `useErrors()` on the reloaded page. They don't reject the returned
 * promise.
 *
 * @param payload - Optional `rememberDevice` flag and custom parameters.
 * @returns A promise that resolves once the form is submitted, before the page
 * reloads. It doesn't confirm that a new notification was sent.
 */
export const resendPushNotification = (payload?: WithRememberOptions) =>
  withError(instance.resendPushNotification(payload));
export const enterCodeManually = (payload?: CustomOptions) =>
  withError(instance.enterCodeManually(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaPushChallengePush
export const useMfaPushChallengePush = (): MfaPushChallengePushMembers =>
  useMemo(() => instance, []);
