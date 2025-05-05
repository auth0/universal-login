// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the LoginPasswordlessEmailCode screen

import React, { createContext, useContext, useMemo } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import type { LoginPasswordlessEmailCodeMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared LoginPasswordlessEmailCode instance.
 */
const LoginPasswordlessEmailCodeContext = createContext<LoginPasswordlessEmailCodeMembers | null>(null);

/**
 * Creates a new, independent LoginPasswordlessEmailCode instance.
 * @returns A fresh LoginPasswordlessEmailCode.
 */
export function useLoginPasswordlessEmailCodeInstance(): LoginPasswordlessEmailCodeMembers {
  return useMemo(() => new LoginPasswordlessEmailCode(), []);
}

/**
 * Provider component that supplies a shared LoginPasswordlessEmailCode instance.
 */
export const LoginPasswordlessEmailCodeProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new LoginPasswordlessEmailCode(), []);
  return <LoginPasswordlessEmailCodeContext.Provider value={instance}>{children}</LoginPasswordlessEmailCodeContext.Provider>;
};

/**
 * Retrieves the shared LoginPasswordlessEmailCode instance from React context.
 *
 * @returns The shared LoginPasswordlessEmailCode instance provided by _LoginPasswordlessEmailCodeProvider_.
 * @throws If used outside of _LoginPasswordlessEmailCodeProvider_.
 */
export function useLoginPasswordlessEmailCodeContext(): LoginPasswordlessEmailCodeMembers {
  const ctx = useContext(LoginPasswordlessEmailCodeContext);
  if (!ctx) {
    throw new Error('useLoginPasswordlessEmailCodeContext must be used within _LoginPasswordlessEmailCodeProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/login-passwordless-email-code';
