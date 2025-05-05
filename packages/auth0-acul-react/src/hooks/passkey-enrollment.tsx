// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the PasskeyEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
import type { PasskeyEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared PasskeyEnrollment instance.
 */
const PasskeyEnrollmentContext = createContext<PasskeyEnrollmentMembers | null>(null);

/**
 * Creates a new, independent PasskeyEnrollment instance.
 * @returns A fresh PasskeyEnrollment.
 */
export function usePasskeyEnrollmentInstance(): PasskeyEnrollmentMembers {
  return useMemo(() => new PasskeyEnrollment(), []);
}

/**
 * Provider component that supplies a shared PasskeyEnrollment instance.
 */
export const PasskeyEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new PasskeyEnrollment(), []);
  return <PasskeyEnrollmentContext.Provider value={instance}>{children}</PasskeyEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared PasskeyEnrollment instance from React context.
 *
 * @returns The shared PasskeyEnrollment instance provided by _PasskeyEnrollmentProvider_.
 * @throws If used outside of _PasskeyEnrollmentProvider_.
 */
export function usePasskeyEnrollmentContext(): PasskeyEnrollmentMembers {
  const ctx = useContext(PasskeyEnrollmentContext);
  if (!ctx) {
    throw new Error('usePasskeyEnrollmentContext must be used within _PasskeyEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/passkey-enrollment';
