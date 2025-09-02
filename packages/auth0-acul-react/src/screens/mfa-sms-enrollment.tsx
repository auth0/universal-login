import { useMemo } from 'react';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaSmsEnrollmentMembers, CustomOptions, ScreenMembersOnMfaSmsEnrollment } from '@auth0/auth0-acul-js/mfa-sms-enrollment';
let instance: MfaSmsEnrollmentMembers | null = null;
const getInstance = (): MfaSmsEnrollmentMembers => {
  if (!instance) {
    instance = new MfaSmsEnrollment();
  }
  return instance;
};

export const useMfaSmsEnrollment = (): MfaSmsEnrollmentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaSmsEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaSmsEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);
export const continueEnrollment = (payload: { phone: string; captcha?: string }) => getInstance().continueEnrollment(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { MfaSmsEnrollmentOptions, ScreenMembersOnMfaSmsEnrollment, MfaSmsEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-sms-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-sms-enrollment';