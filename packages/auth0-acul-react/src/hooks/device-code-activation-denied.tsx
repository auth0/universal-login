// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the DeviceCodeActivationDenied screen

import React, { createContext, useContext, useMemo } from 'react';
import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';
import type { DeviceCodeActivationDeniedMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared DeviceCodeActivationDenied instance.
 */
const DeviceCodeActivationDeniedContext = createContext<DeviceCodeActivationDeniedMembers | null>(null);

/**
 * Creates a new, independent DeviceCodeActivationDenied instance.
 * @returns A fresh DeviceCodeActivationDenied.
 */
export function useDeviceCodeActivationDeniedInstance(): DeviceCodeActivationDeniedMembers {
  return useMemo(() => new DeviceCodeActivationDenied(), []);
}

/**
 * Provider component that supplies a shared DeviceCodeActivationDenied instance.
 */
export const DeviceCodeActivationDeniedProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new DeviceCodeActivationDenied(), []);
  return <DeviceCodeActivationDeniedContext.Provider value={instance}>{children}</DeviceCodeActivationDeniedContext.Provider>;
};

/**
 * Retrieves the shared DeviceCodeActivationDenied instance from React context.
 *
 * @returns The shared DeviceCodeActivationDenied instance provided by _DeviceCodeActivationDeniedProvider_.
 * @throws If used outside of _DeviceCodeActivationDeniedProvider_.
 */
export function useDeviceCodeActivationDeniedContext(): DeviceCodeActivationDeniedMembers {
  const ctx = useContext(DeviceCodeActivationDeniedContext);
  if (!ctx) {
    throw new Error('useDeviceCodeActivationDeniedContext must be used within _DeviceCodeActivationDeniedProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/device-code-activation-denied';
