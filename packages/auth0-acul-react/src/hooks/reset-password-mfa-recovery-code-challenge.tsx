// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaRecoveryCodeChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
import type { ResetPasswordMfaRecoveryCodeChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaRecoveryCodeChallenge instance.
 */
const ResetPasswordMfaRecoveryCodeChallengeContext = createContext<ResetPasswordMfaRecoveryCodeChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaRecoveryCodeChallenge instance.
 * @returns A fresh ResetPasswordMfaRecoveryCodeChallenge.
 */
export function useResetPasswordMfaRecoveryCodeChallengeInstance(): ResetPasswordMfaRecoveryCodeChallengeMembers {
  return useMemo(() => new ResetPasswordMfaRecoveryCodeChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaRecoveryCodeChallenge instance.
 */
export const ResetPasswordMfaRecoveryCodeChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaRecoveryCodeChallenge(), []);
  return <ResetPasswordMfaRecoveryCodeChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaRecoveryCodeChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaRecoveryCodeChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaRecoveryCodeChallenge instance provided by _ResetPasswordMfaRecoveryCodeChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaRecoveryCodeChallengeProvider_.
 */
export function useResetPasswordMfaRecoveryCodeChallengeContext(): ResetPasswordMfaRecoveryCodeChallengeMembers {
  const ctx = useContext(ResetPasswordMfaRecoveryCodeChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaRecoveryCodeChallengeContext must be used within _ResetPasswordMfaRecoveryCodeChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
