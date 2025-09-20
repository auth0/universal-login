import { useMemo } from 'react';
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
import { ContextHooks } from '../hooks/context';
import type { OrganizationPickerMembers, CustomOptions } from '@auth0/auth0-acul-js/organization-picker';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): OrganizationPickerMembers {
  try {
    return getScreen<OrganizationPickerMembers>();
  } catch {
    const instance = new OrganizationPicker();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<OrganizationPickerMembers>(getInstance);

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
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const selectOrganization = (payload: { organization: string; state: string }) => withError(getInstance().selectOrganization(payload));
export const skipOrganizationSelection = (payload?: CustomOptions) => withError(getInstance().skipOrganizationSelection(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of OrganizationPicker
export const useOrganizationPicker = (): OrganizationPickerMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/organization-picker';