import { useMemo } from 'react';
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { PhoneIdentifierEnrollmentMembers, PhoneEnrollmentOptions, CustomOptions, ScreenMembersOnPhoneIdentifierEnrollment } from '@auth0/auth0-acul-js/phone-identifier-enrollment';
let instance: PhoneIdentifierEnrollmentMembers | null = null;
const getInstance = (): PhoneIdentifierEnrollmentMembers => {
  if (!instance) {
    instance = new PhoneIdentifierEnrollment();
  }
  return instance;
};

export const usePhoneIdentifierEnrollment = (): PhoneIdentifierEnrollmentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<PhoneIdentifierEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnPhoneIdentifierEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continuePhoneEnrollment = (payload: PhoneEnrollmentOptions) => getInstance().continuePhoneEnrollment(payload);
export const returnToPrevious = (payload?: CustomOptions) => getInstance().returnToPrevious(payload);

export type { ScreenMembersOnPhoneIdentifierEnrollment, PhoneEnrollmentOptions, PhoneIdentifierEnrollmentMembers } from '@auth0/auth0-acul-js/phone-identifier-enrollment';

export type * from '@auth0/auth0-acul-js/phone-identifier-enrollment';