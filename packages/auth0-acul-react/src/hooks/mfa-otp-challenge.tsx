// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaOtpChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
import type { MfaOtpChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaOtpChallenge instance.
 */
const MfaOtpChallengeContext = createContext<MfaOtpChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaOtpChallenge instance.
 * @returns A fresh MfaOtpChallenge.
 */
export function useMfaOtpChallengeInstance(): MfaOtpChallengeMembers {
  return useMemo(() => new MfaOtpChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaOtpChallenge instance.
 */
export const MfaOtpChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaOtpChallenge(), []);
  return <MfaOtpChallengeContext.Provider value={instance}>{children}</MfaOtpChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaOtpChallenge instance from React context.
 *
 * @returns The shared MfaOtpChallenge instance provided by _MfaOtpChallengeProvider_.
 * @throws If used outside of _MfaOtpChallengeProvider_.
 */
export function useMfaOtpChallengeContext(): MfaOtpChallengeMembers {
  const ctx = useContext(MfaOtpChallengeContext);
  if (!ctx) {
    throw new Error('useMfaOtpChallengeContext must be used within _MfaOtpChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-challenge';
