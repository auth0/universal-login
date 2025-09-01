import { useMemo } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaOtpEnrollmentQrMembers, CustomOptions, ContinueOptions, ScreenMembersOnMfaOtpEnrollmentQr } from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';
let instance: MfaOtpEnrollmentQrMembers | null = null;
const getInstance = (): MfaOtpEnrollmentQrMembers => {
  if (!instance) {
    instance = new MfaOtpEnrollmentQr();
  }
  return instance;
};

export const useMfaOtpEnrollmentQr = (): MfaOtpEnrollmentQrMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaOtpEnrollmentQr = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const toggleView = (payload?: CustomOptions) => getInstance().toggleView(payload);
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { ScreenMembersOnMfaOtpEnrollmentQr, ContinueOptions, MfaOtpEnrollmentQrMembers } from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';