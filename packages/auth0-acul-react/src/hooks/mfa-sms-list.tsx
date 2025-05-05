// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaSmsList screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
import type { MfaSmsListMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaSmsList instance.
 */
const MfaSmsListContext = createContext<MfaSmsListMembers | null>(null);

/**
 * Creates a new, independent MfaSmsList instance.
 * @returns A fresh MfaSmsList.
 */
export function useMfaSmsListInstance(): MfaSmsListMembers {
  return useMemo(() => new MfaSmsList(), []);
}

/**
 * Provider component that supplies a shared MfaSmsList instance.
 */
export const MfaSmsListProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaSmsList(), []);
  return <MfaSmsListContext.Provider value={instance}>{children}</MfaSmsListContext.Provider>;
};

/**
 * Retrieves the shared MfaSmsList instance from React context.
 *
 * @returns The shared MfaSmsList instance provided by _MfaSmsListProvider_.
 * @throws If used outside of _MfaSmsListProvider_.
 */
export function useMfaSmsListContext(): MfaSmsListMembers {
  const ctx = useContext(MfaSmsListContext);
  if (!ctx) {
    throw new Error('useMfaSmsListContext must be used within _MfaSmsListProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-list';
