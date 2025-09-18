import { useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { getScreen, setScreen } from '../state/instance-store';

import type { PhoneIdentifierChallengeMembers, PhoneChallengeOptions, CustomOptions, ScreenMembersOnPhoneIdentifierChallenge } from '@auth0/auth0-acul-js/phone-identifier-challenge';

function getInstance(): PhoneIdentifierChallengeMembers {
  try {
    return getScreen<PhoneIdentifierChallengeMembers>();
  } catch {
    const inst = new PhoneIdentifierChallenge();
    setScreen(inst);
    return inst;
  }
}

export const usePhoneIdentifierChallenge = (): PhoneIdentifierChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnPhoneIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitPhoneChallenge = (payload: PhoneChallengeOptions) => getInstance().submitPhoneChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const returnToPrevious = (payload?: CustomOptions) => getInstance().returnToPrevious(payload);

// Resend hook
export { useResend };

export type { PhoneChallengeOptions, ScreenMembersOnPhoneIdentifierChallenge, PhoneIdentifierChallengeMembers } from '@auth0/auth0-acul-js/phone-identifier-challenge';

export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';