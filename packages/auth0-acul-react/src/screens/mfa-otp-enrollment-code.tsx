import { useMemo } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import { ContextHooks } from '../hooks/context';
import type { MfaOtpEnrollmentCodeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpEnrollmentCode } from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaOtpEnrollmentCodeMembers {
  try {
    return getScreen<MfaOtpEnrollmentCodeMembers>();
  } catch {
    const instance = new MfaOtpEnrollmentCode();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaOtpEnrollmentCodeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaOtpEnrollmentCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaOtpEnrollmentCode
export const useMfaOtpEnrollmentCode = (): MfaOtpEnrollmentCodeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';