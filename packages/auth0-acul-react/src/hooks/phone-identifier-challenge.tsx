// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the PhoneIdentifierChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import type { PhoneIdentifierChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared PhoneIdentifierChallenge instance.
 */
const PhoneIdentifierChallengeContext = createContext<PhoneIdentifierChallengeMembers | null>(null);

/**
 * Creates a new, independent PhoneIdentifierChallenge instance.
 * @returns A fresh PhoneIdentifierChallenge.
 */
export function usePhoneIdentifierChallengeInstance(): PhoneIdentifierChallengeMembers {
  return useMemo(() => new PhoneIdentifierChallenge(), []);
}

/**
 * Provider component that supplies a shared PhoneIdentifierChallenge instance.
 */
export const PhoneIdentifierChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new PhoneIdentifierChallenge(), []);
  return <PhoneIdentifierChallengeContext.Provider value={instance}>{children}</PhoneIdentifierChallengeContext.Provider>;
};

/**
 * Retrieves the shared PhoneIdentifierChallenge instance from React context.
 *
 * @returns The shared PhoneIdentifierChallenge instance provided by _PhoneIdentifierChallengeProvider_.
 * @throws If used outside of _PhoneIdentifierChallengeProvider_.
 */
export function usePhoneIdentifierChallengeContext(): PhoneIdentifierChallengeMembers {
  const ctx = useContext(PhoneIdentifierChallengeContext);
  if (!ctx) {
    throw new Error('usePhoneIdentifierChallengeContext must be used within _PhoneIdentifierChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';
