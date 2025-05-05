// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaEnrollResult screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
import type { MfaEnrollResultMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaEnrollResult instance.
 */
const MfaEnrollResultContext = createContext<MfaEnrollResultMembers | null>(null);

/**
 * Creates a new, independent MfaEnrollResult instance.
 * @returns A fresh MfaEnrollResult.
 */
export function useMfaEnrollResultInstance(): MfaEnrollResultMembers {
  return useMemo(() => new MfaEnrollResult(), []);
}

/**
 * Provider component that supplies a shared MfaEnrollResult instance.
 */
export const MfaEnrollResultProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaEnrollResult(), []);
  return <MfaEnrollResultContext.Provider value={instance}>{children}</MfaEnrollResultContext.Provider>;
};

/**
 * Retrieves the shared MfaEnrollResult instance from React context.
 *
 * @returns The shared MfaEnrollResult instance provided by _MfaEnrollResultProvider_.
 * @throws If used outside of _MfaEnrollResultProvider_.
 */
export function useMfaEnrollResultContext(): MfaEnrollResultMembers {
  const ctx = useContext(MfaEnrollResultContext);
  if (!ctx) {
    throw new Error('useMfaEnrollResultContext must be used within _MfaEnrollResultProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-enroll-result';
