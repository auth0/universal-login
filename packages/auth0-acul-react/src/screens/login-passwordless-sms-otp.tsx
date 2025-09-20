import { useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { ContextHooks } from '../hooks/context';
import type { LoginPasswordlessSmsOtpMembers, SubmitOTPOptions, CustomOptions, StartResendOptions, ScreenMembersOnLoginPasswordlessSmsOtp, TransactionMembersOnLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginPasswordlessSmsOtpMembers {
  try {
    return getScreen<LoginPasswordlessSmsOtpMembers>();
  } catch {
    const instance = new LoginPasswordlessSmsOtp();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnLoginPasswordlessSmsOtp = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPasswordlessSmsOtp = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const submitOTP = (payload: SubmitOTPOptions) => withError(getInstance().submitOTP(payload));
export const resendOTP = (payload?: CustomOptions) => withError(getInstance().resendOTP(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LoginPasswordlessSmsOtp
export const useLoginPasswordlessSmsOtp = (): LoginPasswordlessSmsOtpMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login-passwordless-sms-otp';