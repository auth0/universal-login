import { useMemo } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { ResetPasswordMfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ScreenMembersOnResetPasswordMfaEmailChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
let instance: ResetPasswordMfaEmailChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaEmailChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaEmailChallenge();
  }
  return instance;
};

export const useResetPasswordMfaEmailChallenge = (): ResetPasswordMfaEmailChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMfaEmailChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaEmailChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

/**
 * Hook for managing email resend functionality in reset password MFA email challenge screen.
 *
 * This hook provides functionality to resend MFA email challenges during password reset 
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
 * function ResetPasswordMfaEmailForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Reset password MFA email resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Reset Code'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnResetPasswordMfaEmailChallenge, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ResetPasswordMfaEmailChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';