import { useMemo } from 'react';
import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
import { ContextHooks } from '../hooks/context';
import type { DeviceCodeActivationMembers, ContinueOptions } from '@auth0/auth0-acul-js/device-code-activation';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): DeviceCodeActivationMembers {
  try {
    return getScreen<DeviceCodeActivationMembers>();
  } catch {
    const instance = new DeviceCodeActivation();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of DeviceCodeActivation
export const useDeviceCodeActivation = (): DeviceCodeActivationMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/device-code-activation';