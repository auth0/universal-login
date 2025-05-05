// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaPhoneChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
import type { ResetPasswordMfaPhoneChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaPhoneChallenge instance.
 */
const ResetPasswordMfaPhoneChallengeContext = createContext<ResetPasswordMfaPhoneChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaPhoneChallenge instance.
 * @returns A fresh ResetPasswordMfaPhoneChallenge.
 */
export function useResetPasswordMfaPhoneChallengeInstance(): ResetPasswordMfaPhoneChallengeMembers {
  return useMemo(() => new ResetPasswordMfaPhoneChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaPhoneChallenge instance.
 */
export const ResetPasswordMfaPhoneChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaPhoneChallenge(), []);
  return <ResetPasswordMfaPhoneChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaPhoneChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaPhoneChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaPhoneChallenge instance provided by _ResetPasswordMfaPhoneChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaPhoneChallengeProvider_.
 */
export function useResetPasswordMfaPhoneChallengeContext(): ResetPasswordMfaPhoneChallengeMembers {
  const ctx = useContext(ResetPasswordMfaPhoneChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaPhoneChallengeContext must be used within _ResetPasswordMfaPhoneChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';
