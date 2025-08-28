import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  AcceptInvitationMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/accept-invitation';

// Register the singleton instance of AcceptInvitation
const instance = registerScreen<AcceptInvitationMembers>(AcceptInvitation)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<AcceptInvitationMembers>(instance);
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
export const acceptInvitation = (payload?: CustomOptions) =>
  withError(instance.acceptInvitation(payload));

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks';

// Main instance hook. Returns singleton instance of AcceptInvitation
export const useAcceptInvitation = (): AcceptInvitationMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
