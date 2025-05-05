// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordSuccess screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import type { ResetPasswordSuccessMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordSuccess instance.
 */
const ResetPasswordSuccessContext = createContext<ResetPasswordSuccessMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordSuccess instance.
 * @returns A fresh ResetPasswordSuccess.
 */
export function useResetPasswordSuccessInstance(): ResetPasswordSuccessMembers {
  return useMemo(() => new ResetPasswordSuccess(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordSuccess instance.
 */
export const ResetPasswordSuccessProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordSuccess(), []);
  return <ResetPasswordSuccessContext.Provider value={instance}>{children}</ResetPasswordSuccessContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordSuccess instance from React context.
 *
 * @returns The shared ResetPasswordSuccess instance provided by _ResetPasswordSuccessProvider_.
 * @throws If used outside of _ResetPasswordSuccessProvider_.
 */
export function useResetPasswordSuccessContext(): ResetPasswordSuccessMembers {
  const ctx = useContext(ResetPasswordSuccessContext);
  if (!ctx) {
    throw new Error('useResetPasswordSuccessContext must be used within _ResetPasswordSuccessProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-success';
