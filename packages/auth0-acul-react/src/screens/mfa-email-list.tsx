import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaEmailListMembers,
  SelectMfaEmailOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-email-list';

// Register the singleton instance of MfaEmailList
const instance = registerScreen<MfaEmailListMembers>(MfaEmailList)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaEmailListMembers>(instance);
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
export const selectMfaEmail = (payload: SelectMfaEmailOptions) =>
  withError(instance.selectMfaEmail(payload));
export const goBack = (payload?: CustomOptions) => withError(instance.goBack(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of MfaEmailList
export const useMfaEmailList = (): MfaEmailListMembers => useMemo(() => instance, []);
