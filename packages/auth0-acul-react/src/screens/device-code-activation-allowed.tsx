import { useMemo } from 'react';
import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';
import { ContextHooks } from '../hooks/context';
import type { DeviceCodeActivationAllowedMembers } from '@auth0/auth0-acul-js/device-code-activation-allowed';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): DeviceCodeActivationAllowedMembers {
  try {
    return getScreen<DeviceCodeActivationAllowedMembers>();
  } catch {
    const instance = new DeviceCodeActivationAllowed();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<DeviceCodeActivationAllowedMembers>(getInstance);

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

// Main instance hook. Returns singleton instance of DeviceCodeActivationAllowed
export const useDeviceCodeActivationAllowed = (): DeviceCodeActivationAllowedMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/device-code-activation-allowed';