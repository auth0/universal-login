import { useMemo } from 'react';
import MfaWebAuthnEnrollmentSuccess from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnEnrollmentSuccessMembers, ContinueOptions, ScreenMembersOnMfaWebAuthnEnrollmentSuccess } from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';
let instance: MfaWebAuthnEnrollmentSuccessMembers | null = null;
const getInstance = (): MfaWebAuthnEnrollmentSuccessMembers => {
  if (!instance) {
    instance = new MfaWebAuthnEnrollmentSuccess();
  }
  return instance;
};

export const useMfaWebAuthnEnrollmentSuccess = (): MfaWebAuthnEnrollmentSuccessMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaWebAuthnEnrollmentSuccess = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload?: ContinueOptions) => getInstance().continue(payload);

export type { ScreenMembersOnMfaWebAuthnEnrollmentSuccess, ContinueOptions, MfaWebAuthnEnrollmentSuccessMembers } from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';