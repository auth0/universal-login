import { useMemo } from 'react';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaSmsEnrollmentMembers, CustomOptions, ScreenMembersOnMfaSmsEnrollment } from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaSmsEnrollmentMembers {
  try {
    return getScreen<MfaSmsEnrollmentMembers>();
  } catch {
    const instance = new MfaSmsEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnMfaSmsEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const pickCountryCode = (payload?: CustomOptions) => withError(getInstance().pickCountryCode(payload));
export const continueEnrollment = (payload: { phone: string; captcha?: string }) => withError(getInstance().continueEnrollment(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaSmsEnrollment
export const useMfaSmsEnrollment = (): MfaSmsEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-sms-enrollment';