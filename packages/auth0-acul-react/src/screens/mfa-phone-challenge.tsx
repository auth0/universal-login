import { useMemo } from 'react';
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaPhoneChallengeMembers, ContinueOptions, PickPhoneOptions, PickAuthenticatorOptions, ScreenMembersOnMfaPhoneChallenge } from '@auth0/auth0-acul-js/mfa-phone-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPhoneChallengeMembers {
  try {
    return getScreen<MfaPhoneChallengeMembers>();
  } catch {
    const instance = new MfaPhoneChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaPhoneChallengeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaPhoneChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const pickPhone = (payload?: PickPhoneOptions) => withError(getInstance().pickPhone(payload));
export const tryAnotherMethod = (payload?: PickAuthenticatorOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPhoneChallenge
export const useMfaPhoneChallenge = (): MfaPhoneChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-phone-challenge';