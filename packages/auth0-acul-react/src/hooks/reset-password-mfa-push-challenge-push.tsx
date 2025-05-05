// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the ResetPasswordMfaPushChallengePush screen

import React, { createContext, useContext, useMemo } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import type { ResetPasswordMfaPushChallengePushMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared ResetPasswordMfaPushChallengePush instance.
 */
const ResetPasswordMfaPushChallengePushContext = createContext<ResetPasswordMfaPushChallengePushMembers | null>(null);

/**
 * Creates a new, independent ResetPasswordMfaPushChallengePush instance.
 * @returns A fresh ResetPasswordMfaPushChallengePush.
 */
export function useResetPasswordMfaPushChallengePushInstance(): ResetPasswordMfaPushChallengePushMembers {
  return useMemo(() => new ResetPasswordMfaPushChallengePush(), []);
}

/**
 * Provider component that supplies a shared ResetPasswordMfaPushChallengePush instance.
 */
export const ResetPasswordMfaPushChallengePushProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new ResetPasswordMfaPushChallengePush(), []);
  return <ResetPasswordMfaPushChallengePushContext.Provider value={instance}>{children}</ResetPasswordMfaPushChallengePushContext.Provider>;
};

/**
 * Retrieves the shared ResetPasswordMfaPushChallengePush instance from React context.
 *
 * @returns The shared ResetPasswordMfaPushChallengePush instance provided by _ResetPasswordMfaPushChallengePushProvider_.
 * @throws If used outside of _ResetPasswordMfaPushChallengePushProvider_.
 */
export function useResetPasswordMfaPushChallengePushContext(): ResetPasswordMfaPushChallengePushMembers {
  const ctx = useContext(ResetPasswordMfaPushChallengePushContext);
  if (!ctx) {
    throw new Error('useResetPasswordMfaPushChallengePushContext must be used within _ResetPasswordMfaPushChallengePushProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
