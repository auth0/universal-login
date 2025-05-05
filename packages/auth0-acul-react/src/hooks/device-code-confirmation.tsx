// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the DeviceCodeConfirmation screen

import React, { createContext, useContext, useMemo } from 'react';
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
import type { DeviceCodeConfirmationMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared DeviceCodeConfirmation instance.
 */
const DeviceCodeConfirmationContext = createContext<DeviceCodeConfirmationMembers | null>(null);

/**
 * Creates a new, independent DeviceCodeConfirmation instance.
 * @returns A fresh DeviceCodeConfirmation.
 */
export function useDeviceCodeConfirmationInstance(): DeviceCodeConfirmationMembers {
  return useMemo(() => new DeviceCodeConfirmation(), []);
}

/**
 * Provider component that supplies a shared DeviceCodeConfirmation instance.
 */
export const DeviceCodeConfirmationProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new DeviceCodeConfirmation(), []);
  return <DeviceCodeConfirmationContext.Provider value={instance}>{children}</DeviceCodeConfirmationContext.Provider>;
};

/**
 * Retrieves the shared DeviceCodeConfirmation instance from React context.
 *
 * @returns The shared DeviceCodeConfirmation instance provided by _DeviceCodeConfirmationProvider_.
 * @throws If used outside of _DeviceCodeConfirmationProvider_.
 */
export function useDeviceCodeConfirmationContext(): DeviceCodeConfirmationMembers {
  const ctx = useContext(DeviceCodeConfirmationContext);
  if (!ctx) {
    throw new Error('useDeviceCodeConfirmationContext must be used within _DeviceCodeConfirmationProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/device-code-confirmation';
