import { useMemo } from 'react';
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnPlatformEnrollmentMembers, SubmitPasskeyCredentialOptions, ReportBrowserErrorOptions, CustomOptions, ScreenMembersOnMfaWebAuthnPlatformEnrollment } from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
let instance: MfaWebAuthnPlatformEnrollmentMembers | null = null;
const getInstance = (): MfaWebAuthnPlatformEnrollmentMembers => {
  if (!instance) {
    instance = new MfaWebAuthnPlatformEnrollment();
  }
  return instance;
};

export const useMfaWebAuthnPlatformEnrollment = (): MfaWebAuthnPlatformEnrollmentMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaWebAuthnPlatformEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitPasskeyCredential = (payload?: SubmitPasskeyCredentialOptions) => getInstance().submitPasskeyCredential(payload);
export const reportBrowserError = (payload: ReportBrowserErrorOptions) => getInstance().reportBrowserError(payload);
export const snoozeEnrollment = (payload?: CustomOptions) => getInstance().snoozeEnrollment(payload);
export const refuseEnrollmentOnThisDevice = (payload?: CustomOptions) => getInstance().refuseEnrollmentOnThisDevice(payload);

export type { ScreenMembersOnMfaWebAuthnPlatformEnrollment, SubmitPasskeyCredentialOptions, ReportBrowserErrorOptions, MfaWebAuthnPlatformEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';