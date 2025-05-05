// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the OrganizationPicker screen

import React, { createContext, useContext, useMemo } from 'react';
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
import type { OrganizationPickerMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared OrganizationPicker instance.
 */
const OrganizationPickerContext = createContext<OrganizationPickerMembers | null>(null);

/**
 * Creates a new, independent OrganizationPicker instance.
 * @returns A fresh OrganizationPicker.
 */
export function useOrganizationPickerInstance(): OrganizationPickerMembers {
  return useMemo(() => new OrganizationPicker(), []);
}

/**
 * Provider component that supplies a shared OrganizationPicker instance.
 */
export const OrganizationPickerProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new OrganizationPicker(), []);
  return <OrganizationPickerContext.Provider value={instance}>{children}</OrganizationPickerContext.Provider>;
};

/**
 * Retrieves the shared OrganizationPicker instance from React context.
 *
 * @returns The shared OrganizationPicker instance provided by _OrganizationPickerProvider_.
 * @throws If used outside of _OrganizationPickerProvider_.
 */
export function useOrganizationPickerContext(): OrganizationPickerMembers {
  const ctx = useContext(OrganizationPickerContext);
  if (!ctx) {
    throw new Error('useOrganizationPickerContext must be used within _OrganizationPickerProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/organization-picker';
