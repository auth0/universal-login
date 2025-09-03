import { useMemo } from 'react';
import Consent from '@auth0/auth0-acul-js/consent';
import { ContextHooks } from '../hooks/context-hooks';

import type { ConsentMembers, CustomOptions, ScreenMembersOnConsent } from '@auth0/auth0-acul-js/consent';
let instance: ConsentMembers | null = null;
const getInstance = (): ConsentMembers => {
  if (!instance) {
    instance = new Consent();
  }
  return instance;
};

export const useConsent = (): ConsentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ConsentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnConsent = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const accept = (payload?: CustomOptions) => getInstance().accept(payload);
export const deny = (payload?: CustomOptions) => getInstance().deny(payload);

export type { ScreenMembersOnConsent, ConsentMembers } from '@auth0/auth0-acul-js/consent';

export type * from '@auth0/auth0-acul-js/consent';