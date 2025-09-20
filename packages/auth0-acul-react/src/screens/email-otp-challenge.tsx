import { useMemo } from 'react';
import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
import { ContextHooks } from '../hooks/context';
import type { EmailOTPChallengeMembers, OtpCodeOptions, CustomOptions, StartResendOptions, ScreenMembersOnEmailOTPChallenge } from '@auth0/auth0-acul-js/email-otp-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): EmailOTPChallengeMembers {
  try {
    return getScreen<EmailOTPChallengeMembers>();
  } catch {
    const instance = new EmailOTPChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnEmailOTPChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitCode = (options: OtpCodeOptions) => withError(getInstance().submitCode(options));
export const resendCode = (options?: CustomOptions) => withError(getInstance().resendCode(options));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of EmailOTPChallenge
export const useEmailOTPChallenge = (): EmailOTPChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/email-otp-challenge';