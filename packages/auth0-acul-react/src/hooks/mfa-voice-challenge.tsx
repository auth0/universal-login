// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaVoiceChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
import type { MfaVoiceChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaVoiceChallenge instance.
 */
const MfaVoiceChallengeContext = createContext<MfaVoiceChallengeMembers | null>(null);

/**
 * Creates a new, independent MfaVoiceChallenge instance.
 * @returns A fresh MfaVoiceChallenge.
 */
export function useMfaVoiceChallengeInstance(): MfaVoiceChallengeMembers {
  return useMemo(() => new MfaVoiceChallenge(), []);
}

/**
 * Provider component that supplies a shared MfaVoiceChallenge instance.
 */
export const MfaVoiceChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaVoiceChallenge(), []);
  return <MfaVoiceChallengeContext.Provider value={instance}>{children}</MfaVoiceChallengeContext.Provider>;
};

/**
 * Retrieves the shared MfaVoiceChallenge instance from React context.
 *
 * @returns The shared MfaVoiceChallenge instance provided by _MfaVoiceChallengeProvider_.
 * @throws If used outside of _MfaVoiceChallengeProvider_.
 */
export function useMfaVoiceChallengeContext(): MfaVoiceChallengeMembers {
  const ctx = useContext(MfaVoiceChallengeContext);
  if (!ctx) {
    throw new Error('useMfaVoiceChallengeContext must be used within _MfaVoiceChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-voice-challenge';
