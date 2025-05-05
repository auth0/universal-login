// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the LoginPassword screen

import React, { createContext, useContext, useMemo } from 'react';
import LoginPassword from '@auth0/auth0-acul-js/login-password';
import type { LoginPasswordMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared LoginPassword instance.
 */
const LoginPasswordContext = createContext<LoginPasswordMembers | null>(null);

/**
 * Creates a new, independent LoginPassword instance.
 * @returns A fresh LoginPassword.
 */
export function useLoginPasswordInstance(): LoginPasswordMembers {
  return useMemo(() => new LoginPassword(), []);
}

/**
 * Provider component that supplies a shared LoginPassword instance.
 */
export const LoginPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new LoginPassword(), []);
  return <LoginPasswordContext.Provider value={instance}>{children}</LoginPasswordContext.Provider>;
};

/**
 * Retrieves the shared LoginPassword instance from React context.
 *
 * @returns The shared LoginPassword instance provided by _LoginPasswordProvider_.
 * @throws If used outside of _LoginPasswordProvider_.
 */
export function useLoginPasswordContext(): LoginPasswordMembers {
  const ctx = useContext(LoginPasswordContext);
  if (!ctx) {
    throw new Error('useLoginPasswordContext must be used within _LoginPasswordProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/login-password';
