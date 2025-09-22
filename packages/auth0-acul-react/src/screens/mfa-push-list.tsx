import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPushListMembers,
  SelectMfaPushDeviceOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-push-list';

// Register the singleton instance of MfaPushList
const instance = registerScreen<MfaPushListMembers>(MfaPushList)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPushListMembers>(instance);
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
export const selectMfaPushDevice = (payload: SelectMfaPushDeviceOptions) =>
  withError(instance.selectMfaPushDevice(payload));
export const goBack = (payload?: CustomOptions) => withError(instance.goBack(payload));

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

// Main instance hook. Returns singleton instance of MfaPushList
export const useMfaPushList = (): MfaPushListMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
