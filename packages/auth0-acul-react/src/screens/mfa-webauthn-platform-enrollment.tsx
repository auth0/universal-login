import { useMemo } from 'react';
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnPlatformEnrollmentMembers, SubmitPasskeyCredentialOptions, ReportBrowserErrorOptions, CustomOptions, ScreenMembersOnMfaWebAuthnPlatformEnrollment } from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnPlatformEnrollmentMembers {
  try {
    return getScreen<MfaWebAuthnPlatformEnrollmentMembers>();
  } catch {
    const instance = new MfaWebAuthnPlatformEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaWebAuthnPlatformEnrollmentMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaWebAuthnPlatformEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitPasskeyCredential = (payload?: SubmitPasskeyCredentialOptions) => withError(getInstance().submitPasskeyCredential(payload));
export const reportBrowserError = (payload: ReportBrowserErrorOptions) => withError(getInstance().reportBrowserError(payload));
export const snoozeEnrollment = (payload?: CustomOptions) => withError(getInstance().snoozeEnrollment(payload));
export const refuseEnrollmentOnThisDevice = (payload?: CustomOptions) => withError(getInstance().refuseEnrollmentOnThisDevice(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnPlatformEnrollment
export const useMfaWebAuthnPlatformEnrollment = (): MfaWebAuthnPlatformEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';