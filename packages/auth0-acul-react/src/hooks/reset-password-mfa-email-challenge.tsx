// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaEmailChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import type { ResetPasswordMfaEmailChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaEmailChallenge instance.
 */
const ResetPasswordMfaEmailChallengeContext = createContext<ResetPasswordMfaEmailChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaEmailChallenge instance.
 * @returns A fresh ResetPasswordMfaEmailChallenge.
 */
export function useResetPasswordMfaEmailChallengeInstance(): ResetPasswordMfaEmailChallengeMembers {
  return useMemo(() => new ResetPasswordMfaEmailChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaEmailChallenge instance.
 */
export const ResetPasswordMfaEmailChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaEmailChallenge(), []);
  return <ResetPasswordMfaEmailChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaEmailChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaEmailChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaEmailChallenge instance provided by _ResetPasswordMfaEmailChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaEmailChallengeProvider_.
 */
export function useResetPasswordMfaEmailChallengeContext(): ResetPasswordMfaEmailChallengeMembers {
  const ctx = useContext(ResetPasswordMfaEmailChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaEmailChallengeContext must be used within _ResetPasswordMfaEmailChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
