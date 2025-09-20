import { useMemo } from 'react';
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnRoamingEnrollmentMembers, CustomOptions, ShowErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnRoamingEnrollment } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnRoamingEnrollmentMembers {
  try {
    return getScreen<MfaWebAuthnRoamingEnrollmentMembers>();
  } catch {
    const instance = new MfaWebAuthnRoamingEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaWebAuthnRoamingEnrollmentMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaWebAuthnRoamingEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const enroll = (payload: CustomOptions) => withError(getInstance().enroll(payload));
export const showError = (payload: ShowErrorOptions) => withError(getInstance().showError(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnRoamingEnrollment
export const useMfaWebAuthnRoamingEnrollment = (): MfaWebAuthnRoamingEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';