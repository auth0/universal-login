import { useMemo } from 'react';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaSmsListMembers, MfaSmsListOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-sms-list';
let instance: MfaSmsListMembers | null = null;
const getInstance = (): MfaSmsListMembers => {
  if (!instance) {
    instance = new MfaSmsList();
  }
  return instance;
};

export const useMfaSmsList = (): MfaSmsListMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaSmsListMembers>(getInstance);

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
export const selectPhoneNumber = (payload?: MfaSmsListOptions) => getInstance().selectPhoneNumber(payload);
export const backAction = (payload?: CustomOptions) => getInstance().backAction(payload);

export type { MfaSmsListOptions, MfaSmsListMembers } from '@auth0/auth0-acul-js/mfa-sms-list';

export type * from '@auth0/auth0-acul-js/mfa-sms-list';