import { useMemo } from 'react';
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import { ContextHooks } from '../hooks/context';
import type { PhoneIdentifierEnrollmentMembers, PhoneEnrollmentOptions, CustomOptions, ScreenMembersOnPhoneIdentifierEnrollment } from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): PhoneIdentifierEnrollmentMembers {
  try {
    return getScreen<PhoneIdentifierEnrollmentMembers>();
  } catch {
    const instance = new PhoneIdentifierEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnPhoneIdentifierEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continuePhoneEnrollment = (payload: PhoneEnrollmentOptions) => withError(getInstance().continuePhoneEnrollment(payload));
export const returnToPrevious = (payload?: CustomOptions) => withError(getInstance().returnToPrevious(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of PhoneIdentifierEnrollment
export const usePhoneIdentifierEnrollment = (): PhoneIdentifierEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/phone-identifier-enrollment';