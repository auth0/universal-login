import { useMemo } from 'react';
import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';
import { ContextHooks } from '../hooks/context-hooks';

import type { DeviceCodeActivationAllowedMembers } from '@auth0/auth0-acul-js/device-code-activation-allowed';
let instance: DeviceCodeActivationAllowedMembers | null = null;
const getInstance = (): DeviceCodeActivationAllowedMembers => {
  if (!instance) {
    instance = new DeviceCodeActivationAllowed();
  }
  return instance;
};

export const useDeviceCodeActivationAllowed = (): DeviceCodeActivationAllowedMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<DeviceCodeActivationAllowedMembers>(getInstance);

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

export type { DeviceCodeActivationAllowedMembers } from '@auth0/auth0-acul-js/device-code-activation-allowed';

export type * from '@auth0/auth0-acul-js/device-code-activation-allowed';