import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnErrorMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-error';

// Register the singleton instance of MfaWebAuthnError
const instance = registerScreen<MfaWebAuthnErrorMembers>(MfaWebAuthnError)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnErrorMembers>(instance);
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
export const tryAgain = (payload?: CustomOptions) => withError(instance.tryAgain(payload));
export const usePassword = (payload?: CustomOptions) => withError(instance.usePassword(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));
export const noThanks = (payload?: CustomOptions) => withError(instance.noThanks(payload));

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

// Main instance hook. Returns singleton instance of MfaWebAuthnError
export const useMfaWebAuthnError = (): MfaWebAuthnErrorMembers => useMemo(() => instance, []);

// Export all types from the core SDK for this screen
