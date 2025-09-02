import { useMemo } from 'react';
import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';
import { ContextHooks } from '../hooks/context-hooks';

import type { EmailVerificationResultMembers, ScreenMembersOnEmailVerificationResult } from '@auth0/auth0-acul-js/email-verification-result';
let instance: EmailVerificationResultMembers | null = null;
const getInstance = (): EmailVerificationResultMembers => {
  if (!instance) {
    instance = new EmailVerificationResult();
  }
  return instance;
};

export const useEmailVerificationResult = (): EmailVerificationResultMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<EmailVerificationResultMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnEmailVerificationResult = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

export type { ScreenMembersOnEmailVerificationResult, EmailVerificationResultMembers } from '@auth0/auth0-acul-js/email-verification-result';

export type * from '@auth0/auth0-acul-js/email-verification-result';