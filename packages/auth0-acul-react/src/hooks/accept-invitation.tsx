// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the AcceptInvitation screen

import React, { createContext, useContext, useMemo } from 'react';
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
import type { AcceptInvitationMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared AcceptInvitation instance.
 */
const AcceptInvitationContext = createContext<AcceptInvitationMembers | null>(null);

/**
 * Creates a new, independent AcceptInvitation instance.
 * @returns A fresh AcceptInvitation.
 */
export function useAcceptInvitationInstance(): AcceptInvitationMembers {
  return useMemo(() => new AcceptInvitation(), []);
}

/**
 * Provider component that supplies a shared AcceptInvitation instance.
 */
export const AcceptInvitationProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new AcceptInvitation(), []);
  return <AcceptInvitationContext.Provider value={instance}>{children}</AcceptInvitationContext.Provider>;
};

/**
 * Retrieves the shared AcceptInvitation instance from React context.
 *
 * @returns The shared AcceptInvitation instance provided by _AcceptInvitationProvider_.
 * @throws If used outside of _AcceptInvitationProvider_.
 */
export function useAcceptInvitationContext(): AcceptInvitationMembers {
  const ctx = useContext(AcceptInvitationContext);
  if (!ctx) {
    throw new Error('useAcceptInvitationContext must be used within _AcceptInvitationProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/accept-invitation';
