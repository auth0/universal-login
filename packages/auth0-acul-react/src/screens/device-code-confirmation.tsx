import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  DeviceCodeConfirmationMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/device-code-confirmation';

// Register the singleton instance of DeviceCodeConfirmation
const instance = registerScreen<DeviceCodeConfirmationMembers>(DeviceCodeConfirmation)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<DeviceCodeConfirmationMembers>(instance);
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
export const confirm = (payload?: CustomOptions) => withError(instance.confirm(payload));
export const cancel = (payload?: CustomOptions) => withError(instance.cancel(payload));

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

// Main instance hook. Returns singleton instance of DeviceCodeConfirmation
export const useDeviceCodeConfirmation = (): DeviceCodeConfirmationMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
