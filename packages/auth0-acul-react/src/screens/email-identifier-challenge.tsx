import { useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import { ContextHooks } from '../hooks/context';
import type { EmailIdentifierChallengeMembers, EmailChallengeOptions, CustomOptions, StartResendOptions, ScreenMembersOnEmailIdentifierChallenge } from '@auth0/auth0-acul-js/email-identifier-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): EmailIdentifierChallengeMembers {
  try {
    return getScreen<EmailIdentifierChallengeMembers>();
  } catch {
    const instance = new EmailIdentifierChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<EmailIdentifierChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen: () => ScreenMembersOnEmailIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitEmailChallenge = (payload: EmailChallengeOptions) => withError(getInstance().submitEmailChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const returnToPrevious = (payload?: CustomOptions) => withError(getInstance().returnToPrevious(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of EmailIdentifierChallenge
export const useEmailIdentifierChallenge = (): EmailIdentifierChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/email-identifier-challenge';