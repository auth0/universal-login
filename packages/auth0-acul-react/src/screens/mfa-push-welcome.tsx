import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type { MfaPushWelcomeMembers, CustomOptions } from '@auth0/auth0-acul-js/mfa-push-welcome';

// Register the singleton instance of MfaPushWelcome
const instance = registerScreen<MfaPushWelcomeMembers>(MfaPushWelcome)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPushWelcomeMembers>(instance);
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
export const enroll = (payload?: CustomOptions) => withError(instance.enroll(payload));
export const pickAuthenticator = (payload?: CustomOptions) =>
  withError(instance.pickAuthenticator(payload));

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of MfaPushWelcome
export const useMfaPushWelcome = (): MfaPushWelcomeMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
