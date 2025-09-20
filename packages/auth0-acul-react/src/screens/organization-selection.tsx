import { useMemo } from 'react';
import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';
import { ContextHooks } from '../hooks/context';
import type { OrganizationSelectionMembers, ContinueWithOrganizationNameOptions, ScreenMembersOnOrganizationSelection } from '@auth0/auth0-acul-js/organization-selection';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): OrganizationSelectionMembers {
  try {
    return getScreen<OrganizationSelectionMembers>();
  } catch {
    const instance = new OrganizationSelection();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<OrganizationSelectionMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnOrganizationSelection = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueWithOrganizationName = (payload: ContinueWithOrganizationNameOptions) => withError(getInstance().continueWithOrganizationName(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of OrganizationSelection
export const useOrganizationSelection = (): OrganizationSelectionMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/organization-selection';