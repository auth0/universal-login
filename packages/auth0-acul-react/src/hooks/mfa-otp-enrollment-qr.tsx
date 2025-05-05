// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaOtpEnrollmentQr screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import type { MfaOtpEnrollmentQrMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaOtpEnrollmentQr instance.
 */
const MfaOtpEnrollmentQrContext = createContext<MfaOtpEnrollmentQrMembers | null>(null);

/**
 * Creates a new, independent MfaOtpEnrollmentQr instance.
 * @returns A fresh MfaOtpEnrollmentQr.
 */
export function useMfaOtpEnrollmentQrInstance(): MfaOtpEnrollmentQrMembers {
  return useMemo(() => new MfaOtpEnrollmentQr(), []);
}

/**
 * Provider component that supplies a shared MfaOtpEnrollmentQr instance.
 */
export const MfaOtpEnrollmentQrProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaOtpEnrollmentQr(), []);
  return <MfaOtpEnrollmentQrContext.Provider value={instance}>{children}</MfaOtpEnrollmentQrContext.Provider>;
};

/**
 * Retrieves the shared MfaOtpEnrollmentQr instance from React context.
 *
 * @returns The shared MfaOtpEnrollmentQr instance provided by _MfaOtpEnrollmentQrProvider_.
 * @throws If used outside of _MfaOtpEnrollmentQrProvider_.
 */
export function useMfaOtpEnrollmentQrContext(): MfaOtpEnrollmentQrMembers {
  const ctx = useContext(MfaOtpEnrollmentQrContext);
  if (!ctx) {
    throw new Error('useMfaOtpEnrollmentQrContext must be used within _MfaOtpEnrollmentQrProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
