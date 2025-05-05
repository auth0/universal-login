// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaEmailChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
import type { MfaEmailChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaEmailChallenge instance.
 */
const MfaEmailChallengeContext = createContext<MfaEmailChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaEmailChallenge instance.
 * @returns A fresh MfaEmailChallenge.
 */
export function useMfaEmailChallengeInstance(): MfaEmailChallengeMembers {
  return useMemo(() => new MfaEmailChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaEmailChallenge instance.
 */
export const MfaEmailChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaEmailChallenge(), []);
  return <MfaEmailChallengeContext.Provider value={instance}>{children}</MfaEmailChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaEmailChallenge instance from React context.
 *
 * @returns The shared MfaEmailChallenge instance provided by _MfaEmailChallengeProvider_.
 * @throws If used outside of _MfaEmailChallengeProvider_.
 */
export function useMfaEmailChallengeContext(): MfaEmailChallengeMembers {
  const ctx = useContext(MfaEmailChallengeContext);
  if (!ctx) {
    throw new Error('useMfaEmailChallengeContext must be used within _MfaEmailChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-email-challenge';
