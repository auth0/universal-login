// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the OrganizationSelection screen

import React, { createContext, useContext, useMemo } from 'react';
import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';
import type { OrganizationSelectionMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared OrganizationSelection instance.
 */
const OrganizationSelectionContext = createContext<OrganizationSelectionMembers | null>(null);

/**
 * Creates a new, independent OrganizationSelection instance.
 * @returns A fresh OrganizationSelection.
 */
export function useOrganizationSelectionInstance(): OrganizationSelectionMembers {
  return useMemo(() => new OrganizationSelection(), []);
}

/**
 * Provider component that supplies a shared OrganizationSelection instance.
 */
export const OrganizationSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new OrganizationSelection(), []);
  return <OrganizationSelectionContext.Provider value={instance}>{children}</OrganizationSelectionContext.Provider>;
};

/**
 * Retrieves the shared OrganizationSelection instance from React context.
 *
 * @returns The shared OrganizationSelection instance provided by _OrganizationSelectionProvider_.
 * @throws If used outside of _OrganizationSelectionProvider_.
 */
export function useOrganizationSelectionContext(): OrganizationSelectionMembers {
  const ctx = useContext(OrganizationSelectionContext);
  if (!ctx) {
    throw new Error('useOrganizationSelectionContext must be used within _OrganizationSelectionProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/organization-selection';
