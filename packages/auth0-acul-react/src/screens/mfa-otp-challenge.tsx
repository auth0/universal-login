import { useMemo } from 'react';
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpChallenge } from '@auth0/auth0-acul-js/mfa-otp-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaOtpChallengeMembers {
  try {
    return getScreen<MfaOtpChallengeMembers>();
  } catch {
    const instance = new MfaOtpChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaOtpChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaOtpChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaOtpChallenge
export const useMfaOtpChallenge = (): MfaOtpChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-otp-challenge';