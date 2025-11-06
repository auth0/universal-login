import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  CustomizedConsentMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/customized-consent';

// Register the singleton instance of CustomizedConsent
const instance = registerScreen<CustomizedConsentMembers>(CustomizedConsent)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<CustomizedConsentMembers>(instance);
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
export const accept = (payload?: CustomOptions) => withError(instance.accept(payload));
export const deny = (payload?: CustomOptions) => withError(instance.deny(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of CustomizedConsent
export const useCustomizedConsent = (): CustomizedConsentMembers => useMemo(() => instance, []);
