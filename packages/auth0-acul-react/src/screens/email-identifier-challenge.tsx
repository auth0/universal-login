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
} = factory;

// Submit functions
export const submitEmailChallenge = (payload: EmailChallengeOptions) =>
  withError(instance.submitEmailChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const returnToPrevious = (payload?: CustomOptions) =>
  withError(instance.returnToPrevious(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of EmailIdentifierChallenge
export const useEmailIdentifierChallenge = (): EmailIdentifierChallengeMembers =>
  useMemo(() => instance, []);
