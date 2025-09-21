import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type { DeviceCodeActivationAllowedMembers } from '@auth0/auth0-acul-js/device-code-activation-allowed';

// Register the singleton instance of DeviceCodeActivationAllowed
const instance = registerScreen<DeviceCodeActivationAllowedMembers>(DeviceCodeActivationAllowed)!;

// Context hooks
const factory = new ContextHooks<DeviceCodeActivationAllowedMembers>(instance);
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
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of DeviceCodeActivationAllowed
export const useDeviceCodeActivationAllowed = (): DeviceCodeActivationAllowedMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
