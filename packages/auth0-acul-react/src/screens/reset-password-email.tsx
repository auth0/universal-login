import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordEmailMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-email';

// Register the singleton instance of ResetPasswordEmail
const instance = registerScreen<ResetPasswordEmailMembers>(ResetPasswordEmail)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordEmailMembers>(instance);
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
/**
 * Returns the user to the reset password request screen to request a new email.
 *
 * @remarks
 * Submits a form POST with `action: "resend-email-action"`. Auth0 doesn't send a
 * new email at this step. It renders the `reset-password-request` screen, where the
 * user submits their email or username again to receive a new email. The browser
 * loads a new page, and React state, effects, and timers are lost.
 *
 * @param payload - Optional custom parameters to send with the request.
 * @returns A promise that resolves once the form is submitted, before the new
 * page loads. It doesn't confirm that an email was sent.
 */
export const resendEmail = (payload?: CustomOptions) => withError(instance.resendEmail(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of ResetPasswordEmail
export const useResetPasswordEmail = (): ResetPasswordEmailMembers => useMemo(() => instance, []);
