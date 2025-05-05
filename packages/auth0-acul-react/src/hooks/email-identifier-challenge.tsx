// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the EmailIdentifierChallenge screen

import React, { createContext, useContext, useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import type { EmailIdentifierChallengeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared EmailIdentifierChallenge instance.
 */
const EmailIdentifierChallengeContext = createContext<EmailIdentifierChallengeMembers | null>(null);

/**
 * Creates a new, independent EmailIdentifierChallenge instance.
 * @returns A fresh EmailIdentifierChallenge.
 */
export function useEmailIdentifierChallengeInstance(): EmailIdentifierChallengeMembers {
  return useMemo(() => new EmailIdentifierChallenge(), []);
}

/**
 * Provider component that supplies a shared EmailIdentifierChallenge instance.
 */
export const EmailIdentifierChallengeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new EmailIdentifierChallenge(), []);
  return <EmailIdentifierChallengeContext.Provider value={instance}>{children}</EmailIdentifierChallengeContext.Provider>;
};

/**
 * Retrieves the shared EmailIdentifierChallenge instance from React context.
 *
 * @returns The shared EmailIdentifierChallenge instance provided by _EmailIdentifierChallengeProvider_.
 * @throws If used outside of _EmailIdentifierChallengeProvider_.
 */
export function useEmailIdentifierChallengeContext(): EmailIdentifierChallengeMembers {
  const ctx = useContext(EmailIdentifierChallengeContext);
  if (!ctx) {
    throw new Error('useEmailIdentifierChallengeContext must be used within _EmailIdentifierChallengeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/email-identifier-challenge';
