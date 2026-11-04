import PendingConsent from '@auth0/auth0-acul-js/pending-consent';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { PendingConsentMembers, CustomOptions } from '@auth0/auth0-acul-js/pending-consent';

// Register the singleton instance of PendingConsent
const instance = registerScreen<PendingConsentMembers>(PendingConsent)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PendingConsentMembers>(instance);
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
  useExperiment,
} = factory;

// Submit functions
export const continueMethod = (payload?: CustomOptions) => withError(instance.continue(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of PendingConsent
export const usePendingConsent = (): PendingConsentMembers => useMemo(() => instance, []);
