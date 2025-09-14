import { useMemo } from 'react';
import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { MfaVoiceChallengeMembers, MfaVoiceChallengeContinueOptions, CustomOptions, ScreenMembersOnMfaVoiceChallenge } from '@auth0/auth0-acul-js/mfa-voice-challenge';
let instance: MfaVoiceChallengeMembers | null = null;
const getInstance = (): MfaVoiceChallengeMembers => {
  if (!instance) {
    instance = new MfaVoiceChallenge();
  }
  return instance;
};

export const useMfaVoiceChallenge = (): MfaVoiceChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaVoiceChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaVoiceChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: MfaVoiceChallengeContinueOptions) => getInstance().continue(payload);
export const pickPhone = (payload?: CustomOptions) => getInstance().pickPhone(payload);
export const switchToSms = (payload?: CustomOptions) => getInstance().switchToSms(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

/**
 * Hook for managing voice call resend functionality in MFA voice challenge screen.
 *
 * This hook provides functionality to resend MFA voice challenges with built-in rate limiting
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
 * function MfaVoiceChallengeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 90,
 *     onTimeout: () => console.log('MFA voice call resend available')
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

export type { MfaVoiceChallengeContinueOptions, ScreenMembersOnMfaVoiceChallenge, MfaVoiceChallengeMembers, UntrustedDataMembersOnMfaVoiceChallenge } from '@auth0/auth0-acul-js/mfa-voice-challenge';

export type * from '@auth0/auth0-acul-js/mfa-voice-challenge';