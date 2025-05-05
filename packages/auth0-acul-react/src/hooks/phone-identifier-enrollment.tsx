// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the PhoneIdentifierEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import type { PhoneIdentifierEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared PhoneIdentifierEnrollment instance.
 */
const PhoneIdentifierEnrollmentContext = createContext<PhoneIdentifierEnrollmentMembers | null>(null);

/**
 * Creates a new, independent PhoneIdentifierEnrollment instance.
 * @returns A fresh PhoneIdentifierEnrollment.
 */
export function usePhoneIdentifierEnrollmentInstance(): PhoneIdentifierEnrollmentMembers {
  return useMemo(() => new PhoneIdentifierEnrollment(), []);
}

/**
 * Provider component that supplies a shared PhoneIdentifierEnrollment instance.
 */
export const PhoneIdentifierEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new PhoneIdentifierEnrollment(), []);
  return <PhoneIdentifierEnrollmentContext.Provider value={instance}>{children}</PhoneIdentifierEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared PhoneIdentifierEnrollment instance from React context.
 *
 * @returns The shared PhoneIdentifierEnrollment instance provided by _PhoneIdentifierEnrollmentProvider_.
 * @throws If used outside of _PhoneIdentifierEnrollmentProvider_.
 */
export function usePhoneIdentifierEnrollmentContext(): PhoneIdentifierEnrollmentMembers {
  const ctx = useContext(PhoneIdentifierEnrollmentContext);
  if (!ctx) {
    throw new Error('usePhoneIdentifierEnrollmentContext must be used within _PhoneIdentifierEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/phone-identifier-enrollment';
