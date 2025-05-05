// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaBeginEnrollOptions screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import type { MfaBeginEnrollOptionsMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaBeginEnrollOptions instance.
 */
const MfaBeginEnrollOptionsContext = createContext<MfaBeginEnrollOptionsMembers | null>(null);

/**
 * Creates a new, independent MfaBeginEnrollOptions instance.
 * @returns A fresh MfaBeginEnrollOptions.
 */
export function useMfaBeginEnrollOptionsInstance(): MfaBeginEnrollOptionsMembers {
  return useMemo(() => new MfaBeginEnrollOptions(), []);
}

/**
 * Provider component that supplies a shared MfaBeginEnrollOptions instance.
 */
export const MfaBeginEnrollOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaBeginEnrollOptions(), []);
  return <MfaBeginEnrollOptionsContext.Provider value={instance}>{children}</MfaBeginEnrollOptionsContext.Provider>;
};

/**
 * Retrieves the shared MfaBeginEnrollOptions instance from React context.
 *
 * @returns The shared MfaBeginEnrollOptions instance provided by _MfaBeginEnrollOptionsProvider_.
 * @throws If used outside of _MfaBeginEnrollOptionsProvider_.
 */
export function useMfaBeginEnrollOptionsContext(): MfaBeginEnrollOptionsMembers {
  const ctx = useContext(MfaBeginEnrollOptionsContext);
  if (!ctx) {
    throw new Error('useMfaBeginEnrollOptionsContext must be used within _MfaBeginEnrollOptionsProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
