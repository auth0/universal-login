// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the Login screen

import React, { createContext, useContext, useMemo } from 'react';
import Login from '@auth0/auth0-acul-js/login';
import type { LoginMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared Login instance.
 */
const LoginContext = createContext<LoginMembers | null>(null);

/**
 * Creates a new, independent Login instance.
 * @returns A fresh Login.
 */
export function useLoginInstance(): LoginMembers {
  return useMemo(() => new Login(), []);
}

/**
 * Provider component that supplies a shared Login instance.
 */
export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new Login(), []);
  return <LoginContext.Provider value={instance}>{children}</LoginContext.Provider>;
};

/**
 * Retrieves the shared Login instance from React context.
 *
 * @returns The shared Login instance provided by _LoginProvider_.
 * @throws If used outside of _LoginProvider_.
 */
export function useLoginContext(): LoginMembers {
  const ctx = useContext(LoginContext);
  if (!ctx) {
    throw new Error('useLoginContext must be used within _LoginProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/login';
