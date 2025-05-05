// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPushChallengePush screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import type { MfaPushChallengePushMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPushChallengePush instance.
 */
const MfaPushChallengePushContext = createContext<MfaPushChallengePushMembers | null>(null);

/**
 * Creates a new, independent MfaPushChallengePush instance.
 * @returns A fresh MfaPushChallengePush.
 */
export function useMfaPushChallengePushInstance(): MfaPushChallengePushMembers {
  return useMemo(() => new MfaPushChallengePush(), []);
}

/**
 * Provider component that supplies a shared MfaPushChallengePush instance.
 */
export const MfaPushChallengePushProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPushChallengePush(), []);
  return <MfaPushChallengePushContext.Provider value={instance}>{children}</MfaPushChallengePushContext.Provider>;
};

/**
 * Retrieves the shared MfaPushChallengePush instance from React context.
 *
 * @returns The shared MfaPushChallengePush instance provided by _MfaPushChallengePushProvider_.
 * @throws If used outside of _MfaPushChallengePushProvider_.
 */
export function useMfaPushChallengePushContext(): MfaPushChallengePushMembers {
  const ctx = useContext(MfaPushChallengePushContext);
  if (!ctx) {
    throw new Error('useMfaPushChallengePushContext must be used within _MfaPushChallengePushProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-push-challenge-push';
