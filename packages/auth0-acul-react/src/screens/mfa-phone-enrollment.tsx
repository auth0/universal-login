import { useMemo } from 'react';
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaPhoneEnrollmentMembers, CustomOptions, ContinueOptions } from '@auth0/auth0-acul-js/mfa-phone-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPhoneEnrollmentMembers {
  try {
    return getScreen<MfaPhoneEnrollmentMembers>();
  } catch {
    const instance = new MfaPhoneEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const pickCountryCode = (payload?: CustomOptions) => withError(getInstance().pickCountryCode(payload));
export const continueEnrollment = (payload: ContinueOptions) => withError(getInstance().continueEnrollment(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPhoneEnrollment
export const useMfaPhoneEnrollment = (): MfaPhoneEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-phone-enrollment';