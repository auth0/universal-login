import { useMemo } from 'react';
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
import { ContextHooks } from '../hooks/context';
import type { DeviceCodeConfirmationMembers, CustomOptions, ScreenMembersOnDeviceCodeConfirmation } from '@auth0/auth0-acul-js/device-code-confirmation';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): DeviceCodeConfirmationMembers {
  try {
    return getScreen<DeviceCodeConfirmationMembers>();
  } catch {
    const instance = new DeviceCodeConfirmation();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnDeviceCodeConfirmation = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const confirm = (payload?: CustomOptions) => withError(getInstance().confirm(payload));
export const cancel = (payload?: CustomOptions) => withError(getInstance().cancel(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of DeviceCodeConfirmation
export const useDeviceCodeConfirmation = (): DeviceCodeConfirmationMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/device-code-confirmation';