// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaSmsEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import type { MfaSmsEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaSmsEnrollment instance.
 */
const MfaSmsEnrollmentContext = createContext<MfaSmsEnrollmentMembers | null>(null);

/**
 * Creates a new, independent MfaSmsEnrollment instance.
 * @returns A fresh MfaSmsEnrollment.
 */
export function useMfaSmsEnrollmentInstance(): MfaSmsEnrollmentMembers {
  return useMemo(() => new MfaSmsEnrollment(), []);
}

/**
 * Provider component that supplies a shared MfaSmsEnrollment instance.
 */
export const MfaSmsEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaSmsEnrollment(), []);
  return <MfaSmsEnrollmentContext.Provider value={instance}>{children}</MfaSmsEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared MfaSmsEnrollment instance from React context.
 *
 * @returns The shared MfaSmsEnrollment instance provided by _MfaSmsEnrollmentProvider_.
 * @throws If used outside of _MfaSmsEnrollmentProvider_.
 */
export function useMfaSmsEnrollmentContext(): MfaSmsEnrollmentMembers {
  const ctx = useContext(MfaSmsEnrollmentContext);
  if (!ctx) {
    throw new Error('useMfaSmsEnrollmentContext must be used within _MfaSmsEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-sms-enrollment';
