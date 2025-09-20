import { useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { ContextHooks } from '../hooks/context';
import type { PhoneIdentifierChallengeMembers, PhoneChallengeOptions, CustomOptions, StartResendOptions, ScreenMembersOnPhoneIdentifierChallenge } from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): PhoneIdentifierChallengeMembers {
  try {
    return getScreen<PhoneIdentifierChallengeMembers>();
  } catch {
    const instance = new PhoneIdentifierChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<PhoneIdentifierChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnPhoneIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitPhoneChallenge = (payload: PhoneChallengeOptions) => withError(getInstance().submitPhoneChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(getInstance().resendCode(payload));
export const returnToPrevious = (payload?: CustomOptions) => withError(getInstance().returnToPrevious(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of PhoneIdentifierChallenge
export const usePhoneIdentifierChallenge = (): PhoneIdentifierChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';