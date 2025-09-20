import { useMemo } from 'react';
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnErrorMembers, CustomOptions, ScreenMembersOnMfaWebAuthnError } from '@auth0/auth0-acul-js/mfa-webauthn-error';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnErrorMembers {
  try {
    return getScreen<MfaWebAuthnErrorMembers>();
  } catch {
    const instance = new MfaWebAuthnError();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaWebAuthnErrorMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaWebAuthnError = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const tryAgain = (payload?: CustomOptions) => withError(getInstance().tryAgain(payload));
export const usePassword = (payload?: CustomOptions) => withError(getInstance().usePassword(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));
export const noThanks = (payload?: CustomOptions) => withError(getInstance().noThanks(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnError
export const useMfaWebAuthnError = (): MfaWebAuthnErrorMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-error';