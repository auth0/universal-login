// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPhoneChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';
import type { MfaPhoneChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPhoneChallenge instance.
 */
const MfaPhoneChallengeContext = createContext<MfaPhoneChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaPhoneChallenge instance.
 * @returns A fresh MfaPhoneChallenge.
 */
export function useMfaPhoneChallengeInstance(): MfaPhoneChallengeMembers {
  return useMemo(() => new MfaPhoneChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaPhoneChallenge instance.
 */
export const MfaPhoneChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPhoneChallenge(), []);
  return <MfaPhoneChallengeContext.Provider value={instance}>{children}</MfaPhoneChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaPhoneChallenge instance from React context.
 *
 * @returns The shared MfaPhoneChallenge instance provided by _MfaPhoneChallengeProvider_.
 * @throws If used outside of _MfaPhoneChallengeProvider_.
 */
export function useMfaPhoneChallengeContext(): MfaPhoneChallengeMembers {
  const ctx = useContext(MfaPhoneChallengeContext);
  if (!ctx) {
    throw new Error('useMfaPhoneChallengeContext must be used within _MfaPhoneChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-phone-challenge';
