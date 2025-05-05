// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPushWelcome screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import type { MfaPushWelcomeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPushWelcome instance.
 */
const MfaPushWelcomeContext = createContext<MfaPushWelcomeMembers | null>(null);

/**
 * Creates a new, independent MfaPushWelcome instance.
 * @returns A fresh MfaPushWelcome.
 */
export function useMfaPushWelcomeInstance(): MfaPushWelcomeMembers {
  return useMemo(() => new MfaPushWelcome(), []);
}

/**
 * Provider component that supplies a shared MfaPushWelcome instance.
 */
export const MfaPushWelcomeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPushWelcome(), []);
  return <MfaPushWelcomeContext.Provider value={instance}>{children}</MfaPushWelcomeContext.Provider>;
};

/**
 * Retrieves the shared MfaPushWelcome instance from React context.
 *
 * @returns The shared MfaPushWelcome instance provided by _MfaPushWelcomeProvider_.
 * @throws If used outside of _MfaPushWelcomeProvider_.
 */
export function useMfaPushWelcomeContext(): MfaPushWelcomeMembers {
  const ctx = useContext(MfaPushWelcomeContext);
  if (!ctx) {
    throw new Error('useMfaPushWelcomeContext must be used within _MfaPushWelcomeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-push-welcome';
