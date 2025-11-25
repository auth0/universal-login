import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnNotAvailableErrorMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';

// Register the singleton instance of MfaWebAuthnNotAvailableError
const instance = registerScreen<MfaWebAuthnNotAvailableErrorMembers>(MfaWebAuthnNotAvailableError)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnNotAvailableErrorMembers>(instance);
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
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaWebAuthnNotAvailableError
export const useMfaWebAuthnNotAvailableError = (): MfaWebAuthnNotAvailableErrorMembers =>
  useMemo(() => instance, []);
