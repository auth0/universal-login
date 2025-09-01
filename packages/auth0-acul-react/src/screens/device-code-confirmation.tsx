import { useMemo } from 'react';
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
import { ContextHooks } from '../hooks/context-hooks';

import type { DeviceCodeConfirmationMembers, CustomOptions, ScreenMembersOnDeviceCodeConfirmation } from '@auth0/auth0-acul-js/device-code-confirmation';
let instance: DeviceCodeConfirmationMembers | null = null;
const getInstance = (): DeviceCodeConfirmationMembers => {
  if (!instance) {
    instance = new DeviceCodeConfirmation();
  }
  return instance;
};

export const useDeviceCodeConfirmation = (): DeviceCodeConfirmationMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<DeviceCodeConfirmationMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnDeviceCodeConfirmation = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const confirm = (payload?: CustomOptions) => getInstance().confirm(payload);
export const cancel = (payload?: CustomOptions) => getInstance().cancel(payload);

export type { ScreenMembersOnDeviceCodeConfirmation, DeviceCodeConfirmationMembers } from '@auth0/auth0-acul-js/device-code-confirmation';

export type * from '@auth0/auth0-acul-js/device-code-confirmation';