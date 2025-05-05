// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPushList screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
import type { MfaPushListMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPushList instance.
 */
const MfaPushListContext = createContext<MfaPushListMembers | null>(null);

/**
 * Creates a new, independent MfaPushList instance.
 * @returns A fresh MfaPushList.
 */
export function useMfaPushListInstance(): MfaPushListMembers {
  return useMemo(() => new MfaPushList(), []);
}

/**
 * Provider component that supplies a shared MfaPushList instance.
 */
export const MfaPushListProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPushList(), []);
  return <MfaPushListContext.Provider value={instance}>{children}</MfaPushListContext.Provider>;
};

/**
 * Retrieves the shared MfaPushList instance from React context.
 *
 * @returns The shared MfaPushList instance provided by _MfaPushListProvider_.
 * @throws If used outside of _MfaPushListProvider_.
 */
export function useMfaPushListContext(): MfaPushListMembers {
  const ctx = useContext(MfaPushListContext);
  if (!ctx) {
    throw new Error('useMfaPushListContext must be used within _MfaPushListProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-push-list';
