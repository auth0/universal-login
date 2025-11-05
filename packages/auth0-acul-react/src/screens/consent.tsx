import Consent from '@auth0/auth0-acul-js/consent';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { ConsentMembers, CustomOptions } from '@auth0/auth0-acul-js/consent';

// Register the singleton instance of Consent
const instance = registerScreen<ConsentMembers>(Consent)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ConsentMembers>(instance);
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
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorType,
} from '../hooks';

// Main instance hook. Returns singleton instance of Consent
export const useConsent = (): ConsentMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
