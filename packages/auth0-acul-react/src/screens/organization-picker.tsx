import { useMemo } from 'react';
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
import { ContextHooks } from '../hooks/context-hooks';

import type { OrganizationPickerMembers, CustomOptions } from '@auth0/auth0-acul-js/organization-picker';
let instance: OrganizationPickerMembers | null = null;
const getInstance = (): OrganizationPickerMembers => {
  if (!instance) {
    instance = new OrganizationPicker();
  }
  return instance;
};

export const useOrganizationPicker = (): OrganizationPickerMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const selectOrganization = (payload: { organization: string; state: string }) => getInstance().selectOrganization(payload);
export const skipOrganizationSelection = (payload?: CustomOptions) => getInstance().skipOrganizationSelection(payload);

export type { SelectOrganizationOptions, OrganizationPickerMembers } from '@auth0/auth0-acul-js/organization-picker';

export type * from '@auth0/auth0-acul-js/organization-picker';