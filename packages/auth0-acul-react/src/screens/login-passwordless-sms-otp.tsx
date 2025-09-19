import { useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { setScreen, getScreen } from '../state/instance-store';

import type { LoginPasswordlessSmsOtpMembers, SubmitOTPOptions, CustomOptions, ScreenMembersOnLoginPasswordlessSmsOtp, TransactionMembersOnLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
function getInstance(): LoginPasswordlessSmsOtp {
  try {
    return getScreen<LoginPasswordlessSmsOtp>();
  } catch {
    const inst = new LoginPasswordlessSmsOtp();
    setScreen(inst);
    return inst;
  }
}

export const useLoginPasswordlessSmsOtp = (): LoginPasswordlessSmsOtpMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginPasswordlessSmsOtpMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLoginPasswordlessSmsOtp = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPasswordlessSmsOtp = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitOTP = (payload: SubmitOTPOptions) => getInstance().submitOTP(payload);
export const resendOTP = (payload?: CustomOptions) => getInstance().resendOTP(payload);

// Resend hook
export { useResend };

export type { ScreenMembersOnLoginPasswordlessSmsOtp, TransactionMembersOnLoginPasswordlessSmsOtp, SubmitOTPOptions, LoginPasswordlessSmsOtpMembers } from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

export type * from '@auth0/auth0-acul-js/login-passwordless-sms-otp';