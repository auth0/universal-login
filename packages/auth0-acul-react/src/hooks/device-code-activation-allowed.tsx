// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the DeviceCodeActivationAllowed screen

import React, { createContext, useContext, useMemo } from 'react';
import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';
import type { DeviceCodeActivationAllowedMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared DeviceCodeActivationAllowed instance.
 */
const DeviceCodeActivationAllowedContext = createContext<DeviceCodeActivationAllowedMembers | null>(null);

/**
 * Creates a new, independent DeviceCodeActivationAllowed instance.
 * @returns A fresh DeviceCodeActivationAllowed.
 */
export function useDeviceCodeActivationAllowedInstance(): DeviceCodeActivationAllowedMembers {
  return useMemo(() => new DeviceCodeActivationAllowed(), []);
}

/**
 * Provider component that supplies a shared DeviceCodeActivationAllowed instance.
 */
export const DeviceCodeActivationAllowedProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new DeviceCodeActivationAllowed(), []);
  return <DeviceCodeActivationAllowedContext.Provider value={instance}>{children}</DeviceCodeActivationAllowedContext.Provider>;
};

/**
 * Retrieves the shared DeviceCodeActivationAllowed instance from React context.
 *
 * @returns The shared DeviceCodeActivationAllowed instance provided by _DeviceCodeActivationAllowedProvider_.
 * @throws If used outside of _DeviceCodeActivationAllowedProvider_.
 */
export function useDeviceCodeActivationAllowedContext(): DeviceCodeActivationAllowedMembers {
  const ctx = useContext(DeviceCodeActivationAllowedContext);
  if (!ctx) {
    throw new Error('useDeviceCodeActivationAllowedContext must be used within _DeviceCodeActivationAllowedProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/device-code-activation-allowed';
