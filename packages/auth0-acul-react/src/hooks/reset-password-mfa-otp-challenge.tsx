// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaOtpChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
import type { ResetPasswordMfaOtpChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaOtpChallenge instance.
 */
const ResetPasswordMfaOtpChallengeContext = createContext<ResetPasswordMfaOtpChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaOtpChallenge instance.
 * @returns A fresh ResetPasswordMfaOtpChallenge.
 */
export function useResetPasswordMfaOtpChallengeInstance(): ResetPasswordMfaOtpChallengeMembers {
  return useMemo(() => new ResetPasswordMfaOtpChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaOtpChallenge instance.
 */
export const ResetPasswordMfaOtpChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaOtpChallenge(), []);
  return <ResetPasswordMfaOtpChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaOtpChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaOtpChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaOtpChallenge instance provided by _ResetPasswordMfaOtpChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaOtpChallengeProvider_.
 */
export function useResetPasswordMfaOtpChallengeContext(): ResetPasswordMfaOtpChallengeMembers {
  const ctx = useContext(ResetPasswordMfaOtpChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaOtpChallengeContext must be used within _ResetPasswordMfaOtpChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
