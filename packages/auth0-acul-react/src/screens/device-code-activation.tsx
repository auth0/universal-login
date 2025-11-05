import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  DeviceCodeActivationMembers,
  ContinueOptions,
} from '@auth0/auth0-acul-js/device-code-activation';

// Register the singleton instance of DeviceCodeActivation
const instance = registerScreen<DeviceCodeActivationMembers>(DeviceCodeActivation)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<DeviceCodeActivationMembers>(instance);
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

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(instance.continue(payload));

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorType,
} from '../hooks';

// Main instance hook. Returns singleton instance of DeviceCodeActivation
export const useDeviceCodeActivation = (): DeviceCodeActivationMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
