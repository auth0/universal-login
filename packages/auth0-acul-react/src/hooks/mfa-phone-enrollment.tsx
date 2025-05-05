// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPhoneEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
import type { MfaPhoneEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPhoneEnrollment instance.
 */
const MfaPhoneEnrollmentContext = createContext<MfaPhoneEnrollmentMembers | null>(null);

/**
 * Creates a new, independent MfaPhoneEnrollment instance.
 * @returns A fresh MfaPhoneEnrollment.
 */
export function useMfaPhoneEnrollmentInstance(): MfaPhoneEnrollmentMembers {
  return useMemo(() => new MfaPhoneEnrollment(), []);
}

/**
 * Provider component that supplies a shared MfaPhoneEnrollment instance.
 */
export const MfaPhoneEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPhoneEnrollment(), []);
  return <MfaPhoneEnrollmentContext.Provider value={instance}>{children}</MfaPhoneEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared MfaPhoneEnrollment instance from React context.
 *
 * @returns The shared MfaPhoneEnrollment instance provided by _MfaPhoneEnrollmentProvider_.
 * @throws If used outside of _MfaPhoneEnrollmentProvider_.
 */
export function useMfaPhoneEnrollmentContext(): MfaPhoneEnrollmentMembers {
  const ctx = useContext(MfaPhoneEnrollmentContext);
  if (!ctx) {
    throw new Error('useMfaPhoneEnrollmentContext must be used within _MfaPhoneEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-phone-enrollment';
