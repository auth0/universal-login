// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the SignupId screen

import React, { createContext, useContext, useMemo } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import type { SignupIdMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared SignupId instance.
 */
const SignupIdContext = createContext<SignupIdMembers | null>(null);

/**
 * Creates a new, independent SignupId instance.
 * @returns A fresh SignupId.
 */
export function useSignupIdInstance(): SignupIdMembers {
  return useMemo(() => new SignupId(), []);
}

/**
 * Provider component that supplies a shared SignupId instance.
 */
export const SignupIdProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new SignupId(), []);
  return <SignupIdContext.Provider value={instance}>{children}</SignupIdContext.Provider>;
};

/**
 * Retrieves the shared SignupId instance from React context.
 *
 * @returns The shared SignupId instance provided by _SignupIdProvider_.
 * @throws If used outside of _SignupIdProvider_.
 */
export function useSignupIdContext(): SignupIdMembers {
  const ctx = useContext(SignupIdContext);
  if (!ctx) {
    throw new Error('useSignupIdContext must be used within _SignupIdProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/signup-id';
