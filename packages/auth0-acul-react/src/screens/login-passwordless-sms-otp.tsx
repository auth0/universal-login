import { useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { LoginPasswordlessSmsOtpMembers, SubmitOTPOptions, CustomOptions, ScreenMembersOnLoginPasswordlessSmsOtp, TransactionMembersOnLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
let instance: LoginPasswordlessSmsOtpMembers | null = null;
const getInstance = (): LoginPasswordlessSmsOtpMembers => {
  if (!instance) {
    instance = new LoginPasswordlessSmsOtp();
  }
  return instance;
};

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

/**
 * Hook for managing SMS OTP resend functionality in login passwordless SMS OTP screen.
 *
 * This hook provides functionality to resend SMS OTP codes during passwordless login 
 * with built-in rate limiting and timeout management. It returns the resend state and 
 * controls for user interaction.
 *
 * @param {UseResendParams} [payload] - Optional configuration for the resend behavior
 * @param {number} [payload.timeoutSeconds] - Custom timeout duration in seconds
 * @param {OnTimeoutCallback} [payload.onTimeout] - Callback function executed when timeout expires
 * 
 * @returns {UseResendReturn} Object containing:
 *  - `remaining`: number of seconds remaining before resend is available
 *  - `disabled`: boolean indicating if resend is currently disabled
 *  - `startResend`: function to trigger the resend operation
 *
 * @example
 * ```tsx
 * function LoginPasswordlessSmsOtpForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Passwordless SMS OTP resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend SMS Code'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnLoginPasswordlessSmsOtp, TransactionMembersOnLoginPasswordlessSmsOtp, SubmitOTPOptions, LoginPasswordlessSmsOtpMembers } from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

export type * from '@auth0/auth0-acul-js/login-passwordless-sms-otp';