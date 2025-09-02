import { useMemo } from 'react';
import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { EmailOTPChallengeMembers, OtpCodeOptions, CustomOptions, ScreenMembersOnEmailOTPChallenge } from '@auth0/auth0-acul-js/email-otp-challenge';
let instance: EmailOTPChallengeMembers | null = null;
const getInstance = (): EmailOTPChallengeMembers => {
  if (!instance) {
    instance = new EmailOTPChallenge();
  }
  return instance;
};

export const useEmailOTPChallenge = (): EmailOTPChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<EmailOTPChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnEmailOTPChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitCode = (options: OtpCodeOptions) => getInstance().submitCode(options);
export const resendCode = (options?: CustomOptions) => getInstance().resendCode(options);

export type { ScreenMembersOnEmailOTPChallenge, OtpCodeOptions, EmailOTPChallengeMembers } from '@auth0/auth0-acul-js/email-otp-challenge';

export type * from '@auth0/auth0-acul-js/email-otp-challenge';