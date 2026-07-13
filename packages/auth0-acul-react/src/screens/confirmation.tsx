import Confirmation from '@auth0/auth0-acul-js/confirmation';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { ConfirmationMembers, CustomOptions } from '@auth0/auth0-acul-js/confirmation';

// Register the singleton instance of Confirmation
const instance = registerScreen<ConfirmationMembers>(Confirmation)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ConfirmationMembers>(instance);
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
export const proceedToSignup = (payload?: CustomOptions) =>
  withError(instance.proceedToSignup(payload));
export const goBack = (payload?: CustomOptions) => withError(instance.goBack(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of Confirmation
export const useConfirmation = (): ConfirmationMembers => useMemo(() => instance, []);
