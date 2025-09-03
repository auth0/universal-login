import { useMemo } from 'react';
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import { ContextHooks } from '../hooks/context-hooks';

import type { CustomizedConsentMembers, CustomOptions, ScreenMembersOnCustomizedConsent } from '@auth0/auth0-acul-js/customized-consent';
let instance: CustomizedConsentMembers | null = null;
const getInstance = (): CustomizedConsentMembers => {
  if (!instance) {
    instance = new CustomizedConsent();
  }
  return instance;
};

export const useCustomizedConsent = (): CustomizedConsentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<CustomizedConsentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnCustomizedConsent = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const accept = (payload?: CustomOptions) => getInstance().accept(payload);
export const deny = (payload?: CustomOptions) => getInstance().deny(payload);

export type { ScreenMembersOnCustomizedConsent, CustomizedConsentMembers } from '@auth0/auth0-acul-js/customized-consent';

export type * from '@auth0/auth0-acul-js/customized-consent';