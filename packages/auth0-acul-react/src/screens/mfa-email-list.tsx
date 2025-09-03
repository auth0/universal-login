import { useMemo } from 'react';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaEmailListMembers, SelectMfaEmailOptions, CustomOptions, ScreenMembersOnMfaEmailList } from '@auth0/auth0-acul-js/mfa-email-list';
let instance: MfaEmailListMembers | null = null;
const getInstance = (): MfaEmailListMembers => {
  if (!instance) {
    instance = new MfaEmailList();
  }
  return instance;
};

export const useMfaEmailList = (): MfaEmailListMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaEmailListMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaEmailList = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const selectMfaEmail = (payload: SelectMfaEmailOptions) => getInstance().selectMfaEmail(payload);
export const goBack = (payload?: CustomOptions) => getInstance().goBack(payload);

export type { ScreenMembersOnMfaEmailList, SelectMfaEmailOptions, MfaEmailListMembers } from '@auth0/auth0-acul-js/mfa-email-list';

export type * from '@auth0/auth0-acul-js/mfa-email-list';