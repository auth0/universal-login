import { useMemo } from 'react';
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { ResetPasswordMfaVoiceChallengeMembers, ContinueOptions, CustomOptions, ScreenMembersOnResetPasswordMfaVoiceChallenge } from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
let instance: ResetPasswordMfaVoiceChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaVoiceChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaVoiceChallenge();
  }
  return instance;
};

export const useResetPasswordMfaVoiceChallenge = (): ResetPasswordMfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMfaVoiceChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const switchToSms = (payload?: CustomOptions) => getInstance().switchToSms(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

/**
 * Hook for managing voice call resend functionality in reset password MFA voice challenge screen.
 *
 * This hook provides functionality to resend MFA voice challenges during password reset 
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
 * function ResetPasswordMfaVoiceForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 90,
 *     onTimeout: () => console.log('Reset password MFA voice call resend available')
 *   });
 *   
 *   return (
 *     <button 
 *       onClick={startResend} 
 *       disabled={disabled}
 *     >
 *       {disabled ? `Call again in ${remaining}s` : 'Call Again'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ScreenMembersOnResetPasswordMfaVoiceChallenge, ContinueOptions, ResetPasswordMfaVoiceChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';