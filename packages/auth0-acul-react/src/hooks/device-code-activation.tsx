// AUTO-GENERATED FILE - DO NOT EDIT
// Hooks and provider for the DeviceCodeActivation screen

import React, { createContext, useContext, useMemo } from 'react';
import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
import type { DeviceCodeActivationMembers } from '@auth0/auth0-acul-js';

/**
 * React context for a shared DeviceCodeActivation instance.
 */
const DeviceCodeActivationContext = createContext<DeviceCodeActivationMembers | null>(null);

/**
 * Creates a new, independent DeviceCodeActivation instance.
 * @returns A fresh DeviceCodeActivation.
 */
export function useDeviceCodeActivationInstance(): DeviceCodeActivationMembers {
  return useMemo(() => new DeviceCodeActivation(), []);
}

/**
 * Provider component that supplies a shared DeviceCodeActivation instance.
 */
export const DeviceCodeActivationProvider = ({ children }: { children: React.ReactNode }) => {
  const instance = useMemo(() => new DeviceCodeActivation(), []);
  return <DeviceCodeActivationContext.Provider value={instance}>{children}</DeviceCodeActivationContext.Provider>;
};

/**
 * Retrieves the shared DeviceCodeActivation instance from React context.
 *
 * @returns The shared DeviceCodeActivation instance provided by _DeviceCodeActivationProvider_.
 * @throws If used outside of _DeviceCodeActivationProvider_.
 */
export function useDeviceCodeActivationContext(): DeviceCodeActivationMembers {
  const ctx = useContext(DeviceCodeActivationContext);
  if (!ctx) {
    throw new Error('useDeviceCodeActivationContext must be used within _DeviceCodeActivationProvider_');
  }
  return ctx;
}

export type * from '@auth0/auth0-acul-js/device-code-activation';
