import { useMemo } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { ResetPasswordMfaSmsChallengeMembers, MfaSmsChallengeOptions, CustomOptions, ScreenMembersOnResetPasswordMfaSmsChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
let instance: ResetPasswordMfaSmsChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaSmsChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaSmsChallenge();
  }
  return instance;
};

export const useResetPasswordMfaSmsChallenge = (): ResetPasswordMfaSmsChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMfaSmsChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaSmsChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMfaSmsChallenge = (payload: MfaSmsChallengeOptions) => getInstance().continueMfaSmsChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const getACall = (payload?: CustomOptions) => getInstance().getACall(payload);

/**
 * Hook for managing SMS resend functionality in reset password MFA SMS challenge screen.
 *
 * This hook provides functionality to resend MFA SMS challenges during password reset 
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
 * function ResetPasswordMfaSmsForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Reset password MFA SMS resend available')
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

export type { MfaSmsChallengeOptions, ScreenMembersOnResetPasswordMfaSmsChallenge, ResetPasswordMfaSmsChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';