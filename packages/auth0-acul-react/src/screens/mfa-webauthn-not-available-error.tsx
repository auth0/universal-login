import { useMemo } from 'react';
import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnNotAvailableErrorMembers, CustomOptions } from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnNotAvailableErrorMembers {
  try {
    return getScreen<MfaWebAuthnNotAvailableErrorMembers>();
  } catch {
    const instance = new MfaWebAuthnNotAvailableError();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaWebAuthnNotAvailableErrorMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnNotAvailableError
export const useMfaWebAuthnNotAvailableError = (): MfaWebAuthnNotAvailableErrorMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';