// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaDetectBrowserCapabilities screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import type { MfaDetectBrowserCapabilitiesMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaDetectBrowserCapabilities instance.
 */
const MfaDetectBrowserCapabilitiesContext = createContext<MfaDetectBrowserCapabilitiesMembers | null>(null);

/**
 * Creates a new, independent MfaDetectBrowserCapabilities instance.
 * @returns A fresh MfaDetectBrowserCapabilities.
 */
export function useMfaDetectBrowserCapabilitiesInstance(): MfaDetectBrowserCapabilitiesMembers {
  return useMemo(() => new MfaDetectBrowserCapabilities(), []);
}

/**
 * Provider component that supplies a shared MfaDetectBrowserCapabilities instance.
 */
export const MfaDetectBrowserCapabilitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaDetectBrowserCapabilities(), []);
  return <MfaDetectBrowserCapabilitiesContext.Provider value={instance}>{children}</MfaDetectBrowserCapabilitiesContext.Provider>;
};

/**
 * Retrieves the shared MfaDetectBrowserCapabilities instance from React context.
 *
 * @returns The shared MfaDetectBrowserCapabilities instance provided by _MfaDetectBrowserCapabilitiesProvider_.
 * @throws If used outside of _MfaDetectBrowserCapabilitiesProvider_.
 */
export function useMfaDetectBrowserCapabilitiesContext(): MfaDetectBrowserCapabilitiesMembers {
  const ctx = useContext(MfaDetectBrowserCapabilitiesContext);
  if (!ctx) {
    throw new Error('useMfaDetectBrowserCapabilitiesContext must be used within _MfaDetectBrowserCapabilitiesProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
