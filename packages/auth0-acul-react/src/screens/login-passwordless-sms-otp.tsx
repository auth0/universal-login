import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  LoginPasswordlessSmsOtpMembers,
  SubmitOTPOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

// Register the singleton instance of LoginPasswordlessSmsOtp
const instance = registerScreen<LoginPasswordlessSmsOtpMembers>(LoginPasswordlessSmsOtp)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginPasswordlessSmsOtpMembers>(instance);
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
export const submitOTP = (payload: SubmitOTPOptions) => withError(instance.submitOTP(payload));
export const resendOTP = (payload?: CustomOptions) => withError(instance.resendOTP(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of LoginPasswordlessSmsOtp
export const useLoginPasswordlessSmsOtp = (): LoginPasswordlessSmsOtpMembers =>
  useMemo(() => instance, []);
