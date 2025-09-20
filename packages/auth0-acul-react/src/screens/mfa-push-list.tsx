import { useMemo } from 'react';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
import { ContextHooks } from '../hooks/context';
import type { MfaPushListMembers, SelectMfaPushDeviceOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-push-list';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPushListMembers {
  try {
    return getScreen<MfaPushListMembers>();
  } catch {
    const instance = new MfaPushList();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const selectMfaPushDevice = (payload: SelectMfaPushDeviceOptions) => withError(getInstance().selectMfaPushDevice(payload));
export const goBack = (payload?: CustomOptions) => withError(getInstance().goBack(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPushList
export const useMfaPushList = (): MfaPushListMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-push-list';