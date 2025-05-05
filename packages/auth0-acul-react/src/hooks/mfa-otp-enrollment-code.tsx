// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaOtpEnrollmentCode screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import type { MfaOtpEnrollmentCodeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaOtpEnrollmentCode instance.
 */
const MfaOtpEnrollmentCodeContext = createContext<MfaOtpEnrollmentCodeMembers | null>(null);

/**
 * Creates a new, independent MfaOtpEnrollmentCode instance.
 * @returns A fresh MfaOtpEnrollmentCode.
 */
export function useMfaOtpEnrollmentCodeInstance(): MfaOtpEnrollmentCodeMembers {
  return useMemo(() => new MfaOtpEnrollmentCode(), []);
}

/**
 * Provider component that supplies a shared MfaOtpEnrollmentCode instance.
 */
export const MfaOtpEnrollmentCodeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaOtpEnrollmentCode(), []);
  return <MfaOtpEnrollmentCodeContext.Provider value={instance}>{children}</MfaOtpEnrollmentCodeContext.Provider>;
};

/**
 * Retrieves the shared MfaOtpEnrollmentCode instance from React context.
 *
 * @returns The shared MfaOtpEnrollmentCode instance provided by _MfaOtpEnrollmentCodeProvider_.
 * @throws If used outside of _MfaOtpEnrollmentCodeProvider_.
 */
export function useMfaOtpEnrollmentCodeContext(): MfaOtpEnrollmentCodeMembers {
  const ctx = useContext(MfaOtpEnrollmentCodeContext);
  if (!ctx) {
    throw new Error('useMfaOtpEnrollmentCodeContext must be used within _MfaOtpEnrollmentCodeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
