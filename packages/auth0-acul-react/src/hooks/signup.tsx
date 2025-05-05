// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the Signup screen

import React, { createContext, useContext, useMemo } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';
import type { SignupMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared Signup instance.
 */
const SignupContext = createContext<SignupMembers | null>(null);

/**
 * Creates a new, independent Signup instance.
 * @returns A fresh Signup.
 */
export function useSignupInstance(): SignupMembers {
  return useMemo(() => new Signup(), []);
}

/**
 * Provider component that supplies a shared Signup instance.
 */
export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new Signup(), []);
  return <SignupContext.Provider value={instance}>{children}</SignupContext.Provider>;
};

/**
 * Retrieves the shared Signup instance from React context.
 *
 * @returns The shared Signup instance provided by _SignupProvider_.
 * @throws If used outside of _SignupProvider_.
 */
export function useSignupContext(): SignupMembers {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error('useSignupContext must be used within _SignupProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/signup';
