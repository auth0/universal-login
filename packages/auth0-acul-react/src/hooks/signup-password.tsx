// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the SignupPassword screen

import React, { createContext, useContext, useMemo } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import type { SignupPasswordMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared SignupPassword instance.
 */
const SignupPasswordContext = createContext<SignupPasswordMembers | null>(null);

/**
 * Creates a new, independent SignupPassword instance.
 * @returns A fresh SignupPassword.
 */
export function useSignupPasswordInstance(): SignupPasswordMembers {
  return useMemo(() => new SignupPassword(), []);
}

/**
 * Provider component that supplies a shared SignupPassword instance.
 */
export const SignupPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new SignupPassword(), []);
  return <SignupPasswordContext.Provider value={instance}>{children}</SignupPasswordContext.Provider>;
};

/**
 * Retrieves the shared SignupPassword instance from React context.
 *
 * @returns The shared SignupPassword instance provided by _SignupPasswordProvider_.
 * @throws If used outside of _SignupPasswordProvider_.
 */
export function useSignupPasswordContext(): SignupPasswordMembers {
  const ctx = useContext(SignupPasswordContext);
  if (!ctx) {
    throw new Error('useSignupPasswordContext must be used within _SignupPasswordProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/signup-password';
