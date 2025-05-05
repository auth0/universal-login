// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the RedeemTicket screen

import React, { createContext, useContext, useMemo } from 'react';
import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
import type { RedeemTicketMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared RedeemTicket instance.
 */
const RedeemTicketContext = createContext<RedeemTicketMembers | null>(null);

/**
 * Creates a new, independent RedeemTicket instance.
 * @returns A fresh RedeemTicket.
 */
export function useRedeemTicketInstance(): RedeemTicketMembers {
  return useMemo(() => new RedeemTicket(), []);
}

/**
 * Provider component that supplies a shared RedeemTicket instance.
 */
export const RedeemTicketProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new RedeemTicket(), []);
  return <RedeemTicketContext.Provider value={instance}>{children}</RedeemTicketContext.Provider>;
};

/**
 * Retrieves the shared RedeemTicket instance from React context.
 *
 * @returns The shared RedeemTicket instance provided by _RedeemTicketProvider_.
 * @throws If used outside of _RedeemTicketProvider_.
 */
export function useRedeemTicketContext(): RedeemTicketMembers {
  const ctx = useContext(RedeemTicketContext);
  if (!ctx) {
    throw new Error('useRedeemTicketContext must be used within _RedeemTicketProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/redeem-ticket';
