import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  OrganizationPickerMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/organization-picker';

// Register the singleton instance of OrganizationPicker
const instance = registerScreen<OrganizationPickerMembers>(OrganizationPicker)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<OrganizationPickerMembers>(instance);
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
export const selectOrganization = (payload: { organization: string; state: string }) =>
  withError(instance.selectOrganization(payload));
export const skipOrganizationSelection = (payload?: CustomOptions) =>
  withError(instance.skipOrganizationSelection(payload));

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks';

// Main instance hook. Returns singleton instance of OrganizationPicker
export const useOrganizationPicker = (): OrganizationPickerMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
