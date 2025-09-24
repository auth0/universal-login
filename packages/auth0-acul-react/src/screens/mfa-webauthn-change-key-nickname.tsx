import MfaWebAuthnChangeKeyNickname from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaWebAuthnChangeKeyNicknameMembers,
  ContinueOptions,
} from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';

// Register the singleton instance of MfaWebAuthnChangeKeyNickname
const instance = registerScreen<MfaWebAuthnChangeKeyNicknameMembers>(MfaWebAuthnChangeKeyNickname)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaWebAuthnChangeKeyNicknameMembers>(instance);
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
export const continueWithNewNickname = (payload: ContinueOptions) =>
  withError(instance.continueWithNewNickname(payload));

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

// Main instance hook. Returns singleton instance of MfaWebAuthnChangeKeyNickname
export const useMfaWebAuthnChangeKeyNickname = (): MfaWebAuthnChangeKeyNicknameMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
