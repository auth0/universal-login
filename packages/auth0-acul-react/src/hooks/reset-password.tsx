// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPassword screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import type { ResetPasswordMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPassword instance.
 */
const ResetPasswordContext = createContext<ResetPasswordMembers | null>(null);

/**
 * Creates a new, independent ResetPassword instance.
 * @returns A fresh ResetPassword.
 */
export function useResetPasswordInstance(): ResetPasswordMembers {
  return useMemo(() => new ResetPassword(), []);
}

/**
 * Provider component that supplies a shared ResetPassword instance.
 */
export const ResetPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPassword(), []);
  return <ResetPasswordContext.Provider value={instance}>{children}</ResetPasswordContext.Provider>;
};

/**
 * Retrieves the shared ResetPassword instance from React context.
 *
 * @returns The shared ResetPassword instance provided by _ResetPasswordProvider_.
 * @throws If used outside of _ResetPasswordProvider_.
 */
export function useResetPasswordContext(): ResetPasswordMembers {
  const ctx = useContext(ResetPasswordContext);
  if (!ctx) {
    throw new Error('useResetPasswordContext must be used within _ResetPasswordProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password';
