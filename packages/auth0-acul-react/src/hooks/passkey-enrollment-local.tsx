// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the PasskeyEnrollmentLocal screen

import React, { createContext, useContext, useMemo } from 'react';
import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
import type { PasskeyEnrollmentLocalMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared PasskeyEnrollmentLocal instance.
 */
const PasskeyEnrollmentLocalContext = createContext<PasskeyEnrollmentLocalMembers | null>(null);

/**
 * Creates a new, independent PasskeyEnrollmentLocal instance.
 * @returns A fresh PasskeyEnrollmentLocal.
 */
export function usePasskeyEnrollmentLocalInstance(): PasskeyEnrollmentLocalMembers {
  return useMemo(() => new PasskeyEnrollmentLocal(), []);
}

/**
 * Provider component that supplies a shared PasskeyEnrollmentLocal instance.
 */
export const PasskeyEnrollmentLocalProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new PasskeyEnrollmentLocal(), []);
  return <PasskeyEnrollmentLocalContext.Provider value={instance}>{children}</PasskeyEnrollmentLocalContext.Provider>;
};

/**
 * Retrieves the shared PasskeyEnrollmentLocal instance from React context.
 *
 * @returns The shared PasskeyEnrollmentLocal instance provided by _PasskeyEnrollmentLocalProvider_.
 * @throws If used outside of _PasskeyEnrollmentLocalProvider_.
 */
export function usePasskeyEnrollmentLocalContext(): PasskeyEnrollmentLocalMembers {
  const ctx = useContext(PasskeyEnrollmentLocalContext);
  if (!ctx) {
    throw new Error('usePasskeyEnrollmentLocalContext must be used within _PasskeyEnrollmentLocalProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/passkey-enrollment-local';
