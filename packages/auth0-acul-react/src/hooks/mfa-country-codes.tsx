// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the MfaCountryCodes screen

import React, { createContext, useContext, useMemo } from 'react';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
import type { MfaCountryCodesMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared MfaCountryCodes instance.
 */
const MfaCountryCodesContext = createContext<MfaCountryCodesMembers | null>(null);

/**
 * Creates a new, independent MfaCountryCodes instance.
 * @returns A fresh MfaCountryCodes.
 */
export function useMfaCountryCodesInstance(): MfaCountryCodesMembers {
  return useMemo(() => new MfaCountryCodes(), []);
}

/**
 * Provider component that supplies a shared MfaCountryCodes instance.
 */
export const MfaCountryCodesProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new MfaCountryCodes(), []);
  return <MfaCountryCodesContext.Provider value={instance}>{children}</MfaCountryCodesContext.Provider>;
};

/**
 * Retrieves the shared MfaCountryCodes instance from React context.
 *
 * @returns The shared MfaCountryCodes instance provided by _MfaCountryCodesProvider_.
 * @throws If used outside of _MfaCountryCodesProvider_.
 */
export function useMfaCountryCodesContext(): MfaCountryCodesMembers {
  const ctx = useContext(MfaCountryCodesContext);
  if (!ctx) {
    throw new Error('useMfaCountryCodesContext must be used within _MfaCountryCodesProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/mfa-country-codes';
