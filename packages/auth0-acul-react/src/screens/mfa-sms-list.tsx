import { useMemo } from 'react';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
import { ContextHooks } from '../hooks/context';
import type { MfaSmsListMembers, MfaSmsListOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-sms-list';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaSmsListMembers {
  try {
    return getScreen<MfaSmsListMembers>();
  } catch {
    const instance = new MfaSmsList();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const selectPhoneNumber = (payload?: MfaSmsListOptions) => withError(getInstance().selectPhoneNumber(payload));
export const backAction = (payload?: CustomOptions) => withError(getInstance().backAction(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaSmsList
export const useMfaSmsList = (): MfaSmsListMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-sms-list';