import { useMemo } from 'react';
import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { EmailOTPChallengeMembers, OtpCodeOptions, CustomOptions, ScreenMembersOnEmailOTPChallenge } from '@auth0/auth0-acul-js/email-otp-challenge';
let instance: EmailOTPChallengeMembers | null = null;
const getInstance = (): EmailOTPChallengeMembers => {
  if (!instance) {
    instance = new EmailOTPChallenge();
  }
  return instance;
};

export const useEmailOTPChallenge = (): EmailOTPChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<EmailOTPChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnEmailOTPChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitCode = (options: OtpCodeOptions) => getInstance().submitCode(options);
export const resendCode = (options?: CustomOptions) => getInstance().resendCode(options);

/**
 * Hook for managing OTP code resend functionality in email-otp-challenge screen.
 *
 * This hook provides functionality to resend OTP codes with built-in rate limiting
 * and timeout management. It returns the resend state and controls for user interaction.
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
 * function EmailOTPChallengeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnEmailOTPChallenge, OtpCodeOptions, EmailOTPChallengeMembers } from '@auth0/auth0-acul-js/email-otp-challenge';

export type * from '@auth0/auth0-acul-js/email-otp-challenge';