import { useMemo } from 'react';
import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
import { ContextHooks } from '../hooks/context-hooks';

import type { DeviceCodeActivationMembers, ContinueOptions } from '@auth0/auth0-acul-js/device-code-activation';
let instance: DeviceCodeActivationMembers | null = null;
const getInstance = (): DeviceCodeActivationMembers => {
  if (!instance) {
    instance = new DeviceCodeActivation();
  }
  return instance;
};

export const useDeviceCodeActivation = (): DeviceCodeActivationMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<DeviceCodeActivationMembers>(getInstance);

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
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);

export type { ContinueOptions, DeviceCodeActivationMembers } from '@auth0/auth0-acul-js/device-code-activation';

export type * from '@auth0/auth0-acul-js/device-code-activation';