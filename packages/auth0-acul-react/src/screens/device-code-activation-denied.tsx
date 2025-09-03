import { useMemo } from 'react';
import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';
import { ContextHooks } from '../hooks/context-hooks';

import type { DeviceCodeActivationDeniedMembers } from '@auth0/auth0-acul-js/device-code-activation-denied';
let instance: DeviceCodeActivationDeniedMembers | null = null;
const getInstance = (): DeviceCodeActivationDeniedMembers => {
  if (!instance) {
    instance = new DeviceCodeActivationDenied();
  }
  return instance;
};

export const useDeviceCodeActivationDenied = (): DeviceCodeActivationDeniedMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<DeviceCodeActivationDeniedMembers>(getInstance);

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

export type { DeviceCodeActivationDeniedMembers } from '@auth0/auth0-acul-js/device-code-activation-denied';

export type * from '@auth0/auth0-acul-js/device-code-activation-denied';