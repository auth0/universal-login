import { useMemo } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaOtpEnrollmentCodeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpEnrollmentCode } from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
let instance: MfaOtpEnrollmentCodeMembers | null = null;
const getInstance = (): MfaOtpEnrollmentCodeMembers => {
  if (!instance) {
    instance = new MfaOtpEnrollmentCode();
  }
  return instance;
};

export const useMfaOtpEnrollmentCode = (): MfaOtpEnrollmentCodeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaOtpEnrollmentCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

export type { ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpEnrollmentCode, MfaOtpEnrollmentCodeMembers } from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

export type * from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';