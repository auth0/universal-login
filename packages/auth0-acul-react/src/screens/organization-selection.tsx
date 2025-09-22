import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  OrganizationSelectionMembers,
  ContinueWithOrganizationNameOptions,
} from '@auth0/auth0-acul-js/organization-selection';

// Register the singleton instance of OrganizationSelection
const instance = registerScreen<OrganizationSelectionMembers>(OrganizationSelection)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<OrganizationSelectionMembers>(instance);
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
export const continueWithOrganizationName = (payload: ContinueWithOrganizationNameOptions) =>
  withError(instance.continueWithOrganizationName(payload));

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

// Main instance hook. Returns singleton instance of OrganizationSelection
export const useOrganizationSelection = (): OrganizationSelectionMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
