import { useMemo } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { LoginPasswordlessEmailCodeMembers, SubmitCodeOptions, CustomOptions, ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode } from '@auth0/auth0-acul-js/login-passwordless-email-code';
let instance: LoginPasswordlessEmailCodeMembers | null = null;
const getInstance = (): LoginPasswordlessEmailCodeMembers => {
  if (!instance) {
    instance = new LoginPasswordlessEmailCode();
  }
  return instance;
};

export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitCode = (payload: SubmitCodeOptions) => getInstance().submitCode(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);

/**
 * Hook for managing email code resend functionality in login passwordless email code screen.
 *
 * This hook provides functionality to resend email codes during passwordless login 
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
 * function LoginPasswordlessEmailCodeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Passwordless email code resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Email Code'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode, SubmitCodeOptions, LoginPasswordlessEmailCodeMembers } from '@auth0/auth0-acul-js/login-passwordless-email-code';

export type * from '@auth0/auth0-acul-js/login-passwordless-email-code';