import Confirmation from '@auth0/auth0-acul-js/confirmation';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { ConfirmationMembers } from '@auth0/auth0-acul-js/confirmation';

// Register the singleton instance of Confirmation
const instance = registerScreen<ConfirmationMembers>(Confirmation)!;

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

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of Confirmation
export const useConfirmation = (): ConfirmationMembers => useMemo(() => instance, []);
