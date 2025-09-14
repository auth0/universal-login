import { useMemo } from 'react';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { MfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ScreenMembersOnMfaEmailChallenge } from '@auth0/auth0-acul-js/mfa-email-challenge';
let instance: MfaEmailChallengeMembers | null = null;
const getInstance = (): MfaEmailChallengeMembers => {
  if (!instance) {
    instance = new MfaEmailChallenge();
  }
  return instance;
};

export const useMfaEmailChallenge = (): MfaEmailChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaEmailChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaEmailChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) => getInstance().tryAnotherMethod(payload);

/**
 * Hook for managing email resend functionality in MFA email challenge screen.
 *
 * This hook provides functionality to resend MFA email challenges with built-in rate limiting
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
 * function MfaEmailChallengeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('MFA email resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Resend in ${remaining}s` : 'Resend MFA Email'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnMfaEmailChallenge, UntrustedDataMembersOnMfaEmailChallenge, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, MfaEmailChallengeMembers } from '@auth0/auth0-acul-js/mfa-email-challenge';

export type * from '@auth0/auth0-acul-js/mfa-email-challenge';