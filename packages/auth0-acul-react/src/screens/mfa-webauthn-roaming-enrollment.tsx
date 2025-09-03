import { useMemo } from 'react';
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnRoamingEnrollmentMembers, CustomOptions, ShowErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnRoamingEnrollment } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
let instance: MfaWebAuthnRoamingEnrollmentMembers | null = null;
const getInstance = (): MfaWebAuthnRoamingEnrollmentMembers => {
  if (!instance) {
    instance = new MfaWebAuthnRoamingEnrollment();
  }
  return instance;
};

export const useMfaWebAuthnRoamingEnrollment = (): MfaWebAuthnRoamingEnrollmentMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaWebAuthnRoamingEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const enroll = (payload: CustomOptions) => getInstance().enroll(payload);
export const showError = (payload: ShowErrorOptions) => getInstance().showError(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnMfaWebAuthnRoamingEnrollment, ShowErrorOptions, TryAnotherMethodOptions, MfaWebAuthnRoamingEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';