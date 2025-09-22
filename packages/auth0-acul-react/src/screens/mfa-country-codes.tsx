import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaCountryCodesMembers,
  SelectCountryCodeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-country-codes';

// Register the singleton instance of MfaCountryCodes
const instance = registerScreen<MfaCountryCodesMembers>(MfaCountryCodes)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaCountryCodesMembers>(instance);
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
export const selectCountryCode = (payload: SelectCountryCodeOptions) =>
  withError(instance.selectCountryCode(payload));
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

// Main instance hook. Returns singleton instance of MfaCountryCodes
export const useMfaCountryCodes = (): MfaCountryCodesMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
