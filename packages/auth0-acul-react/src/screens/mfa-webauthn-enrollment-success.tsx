import { useMemo } from 'react';
import MfaWebAuthnEnrollmentSuccess from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnEnrollmentSuccessMembers, ContinueOptions, ScreenMembersOnMfaWebAuthnEnrollmentSuccess } from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnEnrollmentSuccessMembers {
  try {
    return getScreen<MfaWebAuthnEnrollmentSuccessMembers>();
  } catch {
    const instance = new MfaWebAuthnEnrollmentSuccess();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaWebAuthnEnrollmentSuccessMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaWebAuthnEnrollmentSuccess = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload?: ContinueOptions) => withError(getInstance().continue(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnEnrollmentSuccess
export const useMfaWebAuthnEnrollmentSuccess = (): MfaWebAuthnEnrollmentSuccessMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';