import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  PhoneIdentifierEnrollmentMembers,
  PhoneEnrollmentOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/phone-identifier-enrollment';

// Register the singleton instance of PhoneIdentifierEnrollment
const instance = registerScreen<PhoneIdentifierEnrollmentMembers>(PhoneIdentifierEnrollment)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PhoneIdentifierEnrollmentMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const continuePhoneEnrollment = (payload: PhoneEnrollmentOptions) =>
  withError(instance.continuePhoneEnrollment(payload));
export const returnToPrevious = (payload?: CustomOptions) =>
  withError(instance.returnToPrevious(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of PhoneIdentifierEnrollment
export const usePhoneIdentifierEnrollment = (): PhoneIdentifierEnrollmentMembers =>
  useMemo(() => instance, []);
