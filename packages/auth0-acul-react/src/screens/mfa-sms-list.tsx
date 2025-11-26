import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaSmsListMembers,
  MfaSmsListOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-sms-list';

// Register the singleton instance of MfaSmsList
const instance = registerScreen<MfaSmsListMembers>(MfaSmsList)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaSmsListMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const selectPhoneNumber = (payload?: MfaSmsListOptions) =>
  withError(instance.selectPhoneNumber(payload));
export const backAction = (payload?: CustomOptions) => withError(instance.backAction(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaSmsList
export const useMfaSmsList = (): MfaSmsListMembers => useMemo(() => instance, []);
