import { useMemo } from 'react';
import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { LoginEmailVerificationMembers, ContinueWithCodeOptions, ResendCodeOptions } from '@auth0/auth0-acul-js/login-email-verification';
let instance: LoginEmailVerificationMembers | null = null;
const getInstance = (): LoginEmailVerificationMembers => {
  if (!instance) {
    instance = new LoginEmailVerification();
  }
  return instance;
};

export const useLoginEmailVerification = (): LoginEmailVerificationMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginEmailVerificationMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueWithCode = (payload: ContinueWithCodeOptions) => getInstance().continueWithCode(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);

/**
 * Hook for managing email resend functionality in login email verification screen.
 *
 * This hook provides functionality to resend email verification during login 
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
 * function LoginEmailVerificationForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Login email verification resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Verification'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ResendCodeOptions, LoginEmailVerificationMembers } from '@auth0/auth0-acul-js/login-email-verification';

export type * from '@auth0/auth0-acul-js/login-email-verification';