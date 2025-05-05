// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the LoginId screen

import React, { createContext, useContext, useMemo } from 'react';
import LoginId from '@auth0/auth0-acul-js/login-id';
import type { LoginIdMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared LoginId instance.
 */
const LoginIdContext = createContext<LoginIdMembers | null>(null);

/**
 * Creates a new, independent LoginId instance.
 * @returns A fresh LoginId.
 */
export function useLoginIdInstance(): LoginIdMembers {
  return useMemo(() => new LoginId(), []);
}

/**
 * Provider component that supplies a shared LoginId instance.
 */
export const LoginIdProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new LoginId(), []);
  return <LoginIdContext.Provider value={instance}>{children}</LoginIdContext.Provider>;
};

/**
 * Retrieves the shared LoginId instance from React context.
 *
 * @returns The shared LoginId instance provided by _LoginIdProvider_.
 * @throws If used outside of _LoginIdProvider_.
 */
export function useLoginIdContext(): LoginIdMembers {
  const ctx = useContext(LoginIdContext);
  if (!ctx) {
    throw new Error('useLoginIdContext must be used within _LoginIdProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/login-id';
