// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaSmsChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import type { ResetPasswordMfaSmsChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaSmsChallenge instance.
 */
const ResetPasswordMfaSmsChallengeContext = createContext<ResetPasswordMfaSmsChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaSmsChallenge instance.
 * @returns A fresh ResetPasswordMfaSmsChallenge.
 */
export function useResetPasswordMfaSmsChallengeInstance(): ResetPasswordMfaSmsChallengeMembers {
  return useMemo(() => new ResetPasswordMfaSmsChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaSmsChallenge instance.
 */
export const ResetPasswordMfaSmsChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaSmsChallenge(), []);
  return <ResetPasswordMfaSmsChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaSmsChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaSmsChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaSmsChallenge instance provided by _ResetPasswordMfaSmsChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaSmsChallengeProvider_.
 */
export function useResetPasswordMfaSmsChallengeContext(): ResetPasswordMfaSmsChallengeMembers {
  const ctx = useContext(ResetPasswordMfaSmsChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaSmsChallengeContext must be used within _ResetPasswordMfaSmsChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
