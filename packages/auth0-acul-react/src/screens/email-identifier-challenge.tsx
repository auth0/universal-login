import { useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { getScreen, setScreen } from '../state/instance-store';

import type { EmailIdentifierChallengeMembers, EmailChallengeOptions, CustomOptions, ScreenMembersOnEmailIdentifierChallenge } from '@auth0/auth0-acul-js/email-identifier-challenge';

function getInstance(): EmailIdentifierChallengeMembers {
  try {
    return getScreen<EmailIdentifierChallengeMembers>();
  } catch {
    const inst = new EmailIdentifierChallenge();
    setScreen(inst);
    return inst;
  }
}

export const useEmailIdentifierChallenge = (): EmailIdentifierChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnEmailIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitEmailChallenge = (payload: EmailChallengeOptions) => getInstance().submitEmailChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const returnToPrevious = (payload?: CustomOptions) => getInstance().returnToPrevious(payload);

// Resend hook
export { useResend };

export type { EmailChallengeOptions, ScreenMembersOnEmailIdentifierChallenge, EmailIdentifierChallengeMembers } from '@auth0/auth0-acul-js/email-identifier-challenge';

export type * from '@auth0/auth0-acul-js/email-identifier-challenge';