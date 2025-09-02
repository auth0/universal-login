import { useMemo } from 'react';
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPhoneEnrollmentMembers, CustomOptions, ContinueOptions } from '@auth0/auth0-acul-js/mfa-phone-enrollment';
let instance: MfaPhoneEnrollmentMembers | null = null;
const getInstance = (): MfaPhoneEnrollmentMembers => {
  if (!instance) {
    instance = new MfaPhoneEnrollment();
  }
  return instance;
};

export const useMfaPhoneEnrollment = (): MfaPhoneEnrollmentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaPhoneEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);
export const continueEnrollment = (payload: ContinueOptions) => getInstance().continueEnrollment(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { ContinueOptions, MfaPhoneEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-phone-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-phone-enrollment';