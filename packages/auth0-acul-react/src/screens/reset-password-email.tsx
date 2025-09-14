import { useMemo } from 'react';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { ResetPasswordEmailMembers, CustomOptions, ScreenMembersOnResetPasswordEmail } from '@auth0/auth0-acul-js/reset-password-email';
let instance: ResetPasswordEmailMembers | null = null;
const getInstance = (): ResetPasswordEmailMembers => {
  if (!instance) {
    instance = new ResetPasswordEmail();
  }
  return instance;
};

export const useResetPasswordEmail = (): ResetPasswordEmailMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordEmailMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordEmail = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const resendEmail = (payload?: CustomOptions) => getInstance().resendEmail(payload);

/**
 * Hook for managing email resend functionality in reset password email screen.
 *
 * This hook provides functionality to resend reset password emails 
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
 * function ResetPasswordEmailForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Reset password email resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Reset Email'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ResetPasswordEmailOptions, ScreenMembersOnResetPasswordEmail, ResetPasswordEmailMembers } from '@auth0/auth0-acul-js/reset-password-email';

export type * from '@auth0/auth0-acul-js/reset-password-email';