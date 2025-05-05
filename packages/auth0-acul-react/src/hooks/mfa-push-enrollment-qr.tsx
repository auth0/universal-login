// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaPushEnrollmentQr screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import type { MfaPushEnrollmentQrMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaPushEnrollmentQr instance.
 */
const MfaPushEnrollmentQrContext = createContext<MfaPushEnrollmentQrMembers | null>(null);

/**
 * Creates a new, independent MfaPushEnrollmentQr instance.
 * @returns A fresh MfaPushEnrollmentQr.
 */
export function useMfaPushEnrollmentQrInstance(): MfaPushEnrollmentQrMembers {
  return useMemo(() => new MfaPushEnrollmentQr(), []);
}

/**
 * Provider component that supplies a shared MfaPushEnrollmentQr instance.
 */
export const MfaPushEnrollmentQrProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaPushEnrollmentQr(), []);
  return <MfaPushEnrollmentQrContext.Provider value={instance}>{children}</MfaPushEnrollmentQrContext.Provider>;
};

/**
 * Retrieves the shared MfaPushEnrollmentQr instance from React context.
 *
 * @returns The shared MfaPushEnrollmentQr instance provided by _MfaPushEnrollmentQrProvider_.
 * @throws If used outside of _MfaPushEnrollmentQrProvider_.
 */
export function useMfaPushEnrollmentQrContext(): MfaPushEnrollmentQrMembers {
  const ctx = useContext(MfaPushEnrollmentQrContext);
  if (!ctx) {
    throw new Error('useMfaPushEnrollmentQrContext must be used within _MfaPushEnrollmentQrProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
