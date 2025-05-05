// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the LoginPasswordlessSmsOtp screen

import React, { createContext, useContext, useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import type { LoginPasswordlessSmsOtpMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared LoginPasswordlessSmsOtp instance.
 */
const LoginPasswordlessSmsOtpContext = createContext<LoginPasswordlessSmsOtpMembers | null>(null);

/**
 * Creates a new, independent LoginPasswordlessSmsOtp instance.
 * @returns A fresh LoginPasswordlessSmsOtp.
 */
export function useLoginPasswordlessSmsOtpInstance(): LoginPasswordlessSmsOtpMembers {
  return useMemo(() => new LoginPasswordlessSmsOtp(), []);
}

/**
 * Provider component that supplies a shared LoginPasswordlessSmsOtp instance.
 */
export const LoginPasswordlessSmsOtpProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new LoginPasswordlessSmsOtp(), []);
  return <LoginPasswordlessSmsOtpContext.Provider value={instance}>{children}</LoginPasswordlessSmsOtpContext.Provider>;
};

/**
 * Retrieves the shared LoginPasswordlessSmsOtp instance from React context.
 *
 * @returns The shared LoginPasswordlessSmsOtp instance provided by _LoginPasswordlessSmsOtpProvider_.
 * @throws If used outside of _LoginPasswordlessSmsOtpProvider_.
 */
export function useLoginPasswordlessSmsOtpContext(): LoginPasswordlessSmsOtpMembers {
  const ctx = useContext(LoginPasswordlessSmsOtpContext);
  if (!ctx) {
    throw new Error('useLoginPasswordlessSmsOtpContext must be used within _LoginPasswordlessSmsOtpProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
