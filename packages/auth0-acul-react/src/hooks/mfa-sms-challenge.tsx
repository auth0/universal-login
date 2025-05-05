// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaSmsChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
import type { MfaSmsChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaSmsChallenge instance.
 */
const MfaSmsChallengeContext = createContext<MfaSmsChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaSmsChallenge instance.
 * @returns A fresh MfaSmsChallenge.
 */
export function useMfaSmsChallengeInstance(): MfaSmsChallengeMembers {
  return useMemo(() => new MfaSmsChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaSmsChallenge instance.
 */
export const MfaSmsChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaSmsChallenge(), []);
  return <MfaSmsChallengeContext.Provider value={instance}>{children}</MfaSmsChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaSmsChallenge instance from React context.
 *
 * @returns The shared MfaSmsChallenge instance provided by _MfaSmsChallengeProvider_.
 * @throws If used outside of _MfaSmsChallengeProvider_.
 */
export function useMfaSmsChallengeContext(): MfaSmsChallengeMembers {
  const ctx = useContext(MfaSmsChallengeContext);
  if (!ctx) {
    throw new Error('useMfaSmsChallengeContext must be used within _MfaSmsChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-challenge';
