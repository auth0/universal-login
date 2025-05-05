// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaRecoveryCodeEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
import type { MfaRecoveryCodeEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaRecoveryCodeEnrollment instance.
 */
const MfaRecoveryCodeEnrollmentContext = createContext<MfaRecoveryCodeEnrollmentMembers | null>(null);

/**
 * Creates a new, independent MfaRecoveryCodeEnrollment instance.
 * @returns A fresh MfaRecoveryCodeEnrollment.
 */
export function useMfaRecoveryCodeEnrollmentInstance(): MfaRecoveryCodeEnrollmentMembers {
  return useMemo(() => new MfaRecoveryCodeEnrollment(), []);
}

/**
 * Provider component that supplies a shared MfaRecoveryCodeEnrollment instance.
 */
export const MfaRecoveryCodeEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaRecoveryCodeEnrollment(), []);
  return <MfaRecoveryCodeEnrollmentContext.Provider value={instance}>{children}</MfaRecoveryCodeEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared MfaRecoveryCodeEnrollment instance from React context.
 *
 * @returns The shared MfaRecoveryCodeEnrollment instance provided by _MfaRecoveryCodeEnrollmentProvider_.
 * @throws If used outside of _MfaRecoveryCodeEnrollmentProvider_.
 */
export function useMfaRecoveryCodeEnrollmentContext(): MfaRecoveryCodeEnrollmentMembers {
  const ctx = useContext(MfaRecoveryCodeEnrollmentContext);
  if (!ctx) {
    throw new Error('useMfaRecoveryCodeEnrollmentContext must be used within _MfaRecoveryCodeEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
