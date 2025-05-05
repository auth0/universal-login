// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaLoginOptions screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';
import type { MfaLoginOptionsMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaLoginOptions instance.
 */
const MfaLoginOptionsContext = createContext<MfaLoginOptionsMembers | null>(null);

/**
 * Creates a new, independent MfaLoginOptions instance.
 * @returns A fresh MfaLoginOptions.
 */
export function useMfaLoginOptionsInstance(): MfaLoginOptionsMembers {
  return useMemo(() => new MfaLoginOptions(), []);
}

/**
 * Provider component that supplies a shared MfaLoginOptions instance.
 */
export const MfaLoginOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaLoginOptions(), []);
  return <MfaLoginOptionsContext.Provider value={instance}>{children}</MfaLoginOptionsContext.Provider>;
};

/**
 * Retrieves the shared MfaLoginOptions instance from React context.
 *
 * @returns The shared MfaLoginOptions instance provided by _MfaLoginOptionsProvider_.
 * @throws If used outside of _MfaLoginOptionsProvider_.
 */
export function useMfaLoginOptionsContext(): MfaLoginOptionsMembers {
  const ctx = useContext(MfaLoginOptionsContext);
  if (!ctx) {
    throw new Error('useMfaLoginOptionsContext must be used within _MfaLoginOptionsProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-login-options';
