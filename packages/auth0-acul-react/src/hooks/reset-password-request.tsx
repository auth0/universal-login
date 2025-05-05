// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordRequest screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import type { ResetPasswordRequestMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordRequest instance.
 */
const ResetPasswordRequestContext = createContext<ResetPasswordRequestMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordRequest instance.
 * @returns A fresh ResetPasswordRequest.
 */
export function useResetPasswordRequestInstance(): ResetPasswordRequestMembers {
  return useMemo(() => new ResetPasswordRequest(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordRequest instance.
 */
export const ResetPasswordRequestProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordRequest(), []);
  return <ResetPasswordRequestContext.Provider value={instance}>{children}</ResetPasswordRequestContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordRequest instance from React context.
 *
 * @returns The shared ResetPasswordRequest instance provided by _ResetPasswordRequestProvider_.
 * @throws If used outside of _ResetPasswordRequestProvider_.
 */
export function useResetPasswordRequestContext(): ResetPasswordRequestMembers {
  const ctx = useContext(ResetPasswordRequestContext);
  if (!ctx) {
    throw new Error('useResetPasswordRequestContext must be used within _ResetPasswordRequestProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-request';
