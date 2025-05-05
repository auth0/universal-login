// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordEmail screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import type { ResetPasswordEmailMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordEmail instance.
 */
const ResetPasswordEmailContext = createContext<ResetPasswordEmailMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordEmail instance.
 * @returns A fresh ResetPasswordEmail.
 */
export function useResetPasswordEmailInstance(): ResetPasswordEmailMembers {
  return useMemo(() => new ResetPasswordEmail(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordEmail instance.
 */
export const ResetPasswordEmailProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordEmail(), []);
  return <ResetPasswordEmailContext.Provider value={instance}>{children}</ResetPasswordEmailContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordEmail instance from React context.
 *
 * @returns The shared ResetPasswordEmail instance provided by _ResetPasswordEmailProvider_.
 * @throws If used outside of _ResetPasswordEmailProvider_.
 */
export function useResetPasswordEmailContext(): ResetPasswordEmailMembers {
  const ctx = useContext(ResetPasswordEmailContext);
  if (!ctx) {
    throw new Error('useResetPasswordEmailContext must be used within _ResetPasswordEmailProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-email';
