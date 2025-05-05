// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordError screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
import type { ResetPasswordErrorMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordError instance.
 */
const ResetPasswordErrorContext = createContext<ResetPasswordErrorMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordError instance.
 * @returns A fresh ResetPasswordError.
 */
export function useResetPasswordErrorInstance(): ResetPasswordErrorMembers {
  return useMemo(() => new ResetPasswordError(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordError instance.
 */
export const ResetPasswordErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordError(), []);
  return <ResetPasswordErrorContext.Provider value={instance}>{children}</ResetPasswordErrorContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordError instance from React context.
 *
 * @returns The shared ResetPasswordError instance provided by _ResetPasswordErrorProvider_.
 * @throws If used outside of _ResetPasswordErrorProvider_.
 */
export function useResetPasswordErrorContext(): ResetPasswordErrorMembers {
  const ctx = useContext(ResetPasswordErrorContext);
  if (!ctx) {
    throw new Error('useResetPasswordErrorContext must be used within _ResetPasswordErrorProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-error';
