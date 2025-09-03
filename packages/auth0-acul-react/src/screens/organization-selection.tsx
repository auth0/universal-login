import { useMemo } from 'react';
import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';
import { ContextHooks } from '../hooks/context-hooks';

import type { OrganizationSelectionMembers, ContinueWithOrganizationNameOptions, ScreenMembersOnOrganizationSelection } from '@auth0/auth0-acul-js/organization-selection';
let instance: OrganizationSelectionMembers | null = null;
const getInstance = (): OrganizationSelectionMembers => {
  if (!instance) {
    instance = new OrganizationSelection();
  }
  return instance;
};

export const useOrganizationSelection = (): OrganizationSelectionMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnOrganizationSelection = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueWithOrganizationName = (payload: ContinueWithOrganizationNameOptions) => getInstance().continueWithOrganizationName(payload);

export type { ContinueWithOrganizationNameOptions, ScreenMembersOnOrganizationSelection, OrganizationSelectionMembers } from '@auth0/auth0-acul-js/organization-selection';

export type * from '@auth0/auth0-acul-js/organization-selection';