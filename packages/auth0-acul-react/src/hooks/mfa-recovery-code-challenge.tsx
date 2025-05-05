// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaRecoveryCodeChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
import type { MfaRecoveryCodeChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaRecoveryCodeChallenge instance.
 */
const MfaRecoveryCodeChallengeContext = createContext<MfaRecoveryCodeChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaRecoveryCodeChallenge instance.
 * @returns A fresh MfaRecoveryCodeChallenge.
 */
export function useMfaRecoveryCodeChallengeInstance(): MfaRecoveryCodeChallengeMembers {
  return useMemo(() => new MfaRecoveryCodeChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaRecoveryCodeChallenge instance.
 */
export const MfaRecoveryCodeChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaRecoveryCodeChallenge(), []);
  return <MfaRecoveryCodeChallengeContext.Provider value={instance}>{children}</MfaRecoveryCodeChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaRecoveryCodeChallenge instance from React context.
 *
 * @returns The shared MfaRecoveryCodeChallenge instance provided by _MfaRecoveryCodeChallengeProvider_.
 * @throws If used outside of _MfaRecoveryCodeChallengeProvider_.
 */
export function useMfaRecoveryCodeChallengeContext(): MfaRecoveryCodeChallengeMembers {
  const ctx = useContext(MfaRecoveryCodeChallengeContext);
  if (!ctx) {
    throw new Error('useMfaRecoveryCodeChallengeContext must be used within _MfaRecoveryCodeChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
