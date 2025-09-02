import { useMemo } from 'react';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPushListMembers, SelectMfaPushDeviceOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-push-list';
let instance: MfaPushListMembers | null = null;
const getInstance = (): MfaPushListMembers => {
  if (!instance) {
    instance = new MfaPushList();
  }
  return instance;
};

export const useMfaPushList = (): MfaPushListMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaPushListMembers>(getInstance);

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
export const selectMfaPushDevice = (payload: SelectMfaPushDeviceOptions) => getInstance().selectMfaPushDevice(payload);
export const goBack = (payload?: CustomOptions) => getInstance().goBack(payload);

export type { SelectMfaPushDeviceOptions, MfaPushListMembers } from '@auth0/auth0-acul-js/mfa-push-list';

export type * from '@auth0/auth0-acul-js/mfa-push-list';