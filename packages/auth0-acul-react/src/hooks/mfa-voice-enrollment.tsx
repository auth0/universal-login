// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaVoiceEnrollment screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import type { MfaVoiceEnrollmentMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaVoiceEnrollment instance.
 */
const MfaVoiceEnrollmentContext = createContext<MfaVoiceEnrollmentMembers | null>(null);

/**
 * Creates a new, independent MfaVoiceEnrollment instance.
 * @returns A fresh MfaVoiceEnrollment.
 */
export function useMfaVoiceEnrollmentInstance(): MfaVoiceEnrollmentMembers {
  return useMemo(() => new MfaVoiceEnrollment(), []);
}

/**
 * Provider component that supplies a shared MfaVoiceEnrollment instance.
 */
export const MfaVoiceEnrollmentProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaVoiceEnrollment(), []);
  return <MfaVoiceEnrollmentContext.Provider value={instance}>{children}</MfaVoiceEnrollmentContext.Provider>;
};

/**
 * Retrieves the shared MfaVoiceEnrollment instance from React context.
 *
 * @returns The shared MfaVoiceEnrollment instance provided by _MfaVoiceEnrollmentProvider_.
 * @throws If used outside of _MfaVoiceEnrollmentProvider_.
 */
export function useMfaVoiceEnrollmentContext(): MfaVoiceEnrollmentMembers {
  const ctx = useContext(MfaVoiceEnrollmentContext);
  if (!ctx) {
    throw new Error('useMfaVoiceEnrollmentContext must be used within _MfaVoiceEnrollmentProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-voice-enrollment';
