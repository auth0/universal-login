import { useMemo } from 'react';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaSmsChallengeMembers, MfaSmsChallengeOptions, CustomOptions, StartResendOptions, ScreenMembersOnMfaSmsChallenge } from '@auth0/auth0-acul-js/mfa-sms-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaSmsChallengeMembers {
  try {
    return getScreen<MfaSmsChallengeMembers>();
  } catch {
    const instance = new MfaSmsChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaSmsChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaSmsChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) => withError(getInstance().continueMfaSmsChallenge(payload));
export const pickSms = (payload?: CustomOptions) => withError(getInstance().pickSms(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));
export const getACall = (payload?: CustomOptions) => withError(getInstance().getACall(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaSmsChallenge
export const useMfaSmsChallenge = (): MfaSmsChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-sms-challenge';