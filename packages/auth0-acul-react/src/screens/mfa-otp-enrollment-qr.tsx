import { useMemo } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import { ContextHooks } from '../hooks/context';
import type { MfaOtpEnrollmentQrMembers, CustomOptions, ContinueOptions, ScreenMembersOnMfaOtpEnrollmentQr } from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaOtpEnrollmentQrMembers {
  try {
    return getScreen<MfaOtpEnrollmentQrMembers>();
  } catch {
    const instance = new MfaOtpEnrollmentQr();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaOtpEnrollmentQrMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaOtpEnrollmentQr = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const toggleView = (payload?: CustomOptions) => withError(getInstance().toggleView(payload));
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaOtpEnrollmentQr
export const useMfaOtpEnrollmentQr = (): MfaOtpEnrollmentQrMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';