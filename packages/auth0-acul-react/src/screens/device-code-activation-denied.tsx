import { useMemo } from 'react';
import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';
import { ContextHooks } from '../hooks/context';
import type { DeviceCodeActivationDeniedMembers } from '@auth0/auth0-acul-js/device-code-activation-denied';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): DeviceCodeActivationDeniedMembers {
  try {
    return getScreen<DeviceCodeActivationDeniedMembers>();
  } catch {
    const instance = new DeviceCodeActivationDenied();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<DeviceCodeActivationDeniedMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of DeviceCodeActivationDenied
export const useDeviceCodeActivationDenied = (): DeviceCodeActivationDeniedMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/device-code-activation-denied';