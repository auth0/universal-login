// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaVoiceChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import type { ResetPasswordMfaVoiceChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaVoiceChallenge instance.
 */
const ResetPasswordMfaVoiceChallengeContext = createContext<ResetPasswordMfaVoiceChallengeMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaVoiceChallenge instance.
 * @returns A fresh ResetPasswordMfaVoiceChallenge.
 */
export function useResetPasswordMfaVoiceChallengeInstance(): ResetPasswordMfaVoiceChallengeMembers {
  return useMemo(() => new ResetPasswordMfaVoiceChallenge(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaVoiceChallenge instance.
 */
export const ResetPasswordMfaVoiceChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaVoiceChallenge(), []);
  return <ResetPasswordMfaVoiceChallengeContext.Provider value={instance}>{children}</ResetPasswordMfaVoiceChallengeContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaVoiceChallenge instance from React context.
 *
 * @returns The shared ResetPasswordMfaVoiceChallenge instance provided by _ResetPasswordMfaVoiceChallengeProvider_.
 * @throws If used outside of _ResetPasswordMfaVoiceChallengeProvider_.
 */
export function useResetPasswordMfaVoiceChallengeContext(): ResetPasswordMfaVoiceChallengeMembers {
  const ctx = useContext(ResetPasswordMfaVoiceChallengeContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaVoiceChallengeContext must be used within _ResetPasswordMfaVoiceChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
