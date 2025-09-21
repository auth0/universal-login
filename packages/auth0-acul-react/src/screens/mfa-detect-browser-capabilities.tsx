import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaDetectBrowserCapabilitiesMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';

// Register the singleton instance of MfaDetectBrowserCapabilities
const instance = registerScreen<MfaDetectBrowserCapabilitiesMembers>(MfaDetectBrowserCapabilities)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaDetectBrowserCapabilitiesMembers>(instance);
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
export const detectCapabilities = (payload: CustomOptions) =>
  withError(instance.detectCapabilities(payload));

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

// Main instance hook. Returns singleton instance of MfaDetectBrowserCapabilities
export const useMfaDetectBrowserCapabilities = (): MfaDetectBrowserCapabilitiesMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
