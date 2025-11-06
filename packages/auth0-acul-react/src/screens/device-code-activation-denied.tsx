import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { DeviceCodeActivationDeniedMembers } from '@auth0/auth0-acul-js/device-code-activation-denied';

// Register the singleton instance of DeviceCodeActivationDenied
const instance = registerScreen<DeviceCodeActivationDeniedMembers>(DeviceCodeActivationDenied)!;

// Context hooks
const factory = new ContextHooks<DeviceCodeActivationDeniedMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of DeviceCodeActivationDenied
export const useDeviceCodeActivationDenied = (): DeviceCodeActivationDeniedMembers =>
  useMemo(() => instance, []);
