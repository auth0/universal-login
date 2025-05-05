// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaEmailList screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
import type { MfaEmailListMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaEmailList instance.
 */
const MfaEmailListContext = createContext<MfaEmailListMembers | null>(null);

/**
 * Creates a new, independent MfaEmailList instance.
 * @returns A fresh MfaEmailList.
 */
export function useMfaEmailListInstance(): MfaEmailListMembers {
  return useMemo(() => new MfaEmailList(), []);
}

/**
 * Provider component that supplies a shared MfaEmailList instance.
 */
export const MfaEmailListProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaEmailList(), []);
  return <MfaEmailListContext.Provider value={instance}>{children}</MfaEmailListContext.Provider>;
};

/**
 * Retrieves the shared MfaEmailList instance from React context.
 *
 * @returns The shared MfaEmailList instance provided by _MfaEmailListProvider_.
 * @throws If used outside of _MfaEmailListProvider_.
 */
export function useMfaEmailListContext(): MfaEmailListMembers {
  const ctx = useContext(MfaEmailListContext);
  if (!ctx) {
    throw new Error('useMfaEmailListContext must be used within _MfaEmailListProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-email-list';
