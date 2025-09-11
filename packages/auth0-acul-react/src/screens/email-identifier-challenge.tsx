import { useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { EmailIdentifierChallengeMembers, EmailChallengeOptions, CustomOptions, ScreenMembersOnEmailIdentifierChallenge } from '@auth0/auth0-acul-js/email-identifier-challenge';

let instance: EmailIdentifierChallengeMembers | null = null;
const getInstance = (): EmailIdentifierChallengeMembers => {
  if (!instance) {
    instance = new EmailIdentifierChallenge();
  }
  return instance;
};

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
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { EmailChallengeOptions, ScreenMembersOnEmailIdentifierChallenge, EmailIdentifierChallengeMembers } from '@auth0/auth0-acul-js/email-identifier-challenge';

export type * from '@auth0/auth0-acul-js/email-identifier-challenge';