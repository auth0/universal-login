import { useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { PhoneIdentifierChallengeMembers, PhoneChallengeOptions, CustomOptions, ScreenMembersOnPhoneIdentifierChallenge } from '@auth0/auth0-acul-js/phone-identifier-challenge';
let instance: PhoneIdentifierChallengeMembers | null = null;
const getInstance = (): PhoneIdentifierChallengeMembers => {
  if (!instance) {
    instance = new PhoneIdentifierChallenge();
  }
  return instance;
};

export const usePhoneIdentifierChallenge = (): PhoneIdentifierChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<PhoneIdentifierChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnPhoneIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitPhoneChallenge = (payload: PhoneChallengeOptions) => getInstance().submitPhoneChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const returnToPrevious = (payload?: CustomOptions) => getInstance().returnToPrevious(payload);

/**
 * Hook for managing phone resend functionality in phone identifier challenge screen.
 *
 * This hook provides functionality to resend phone identifier challenges 
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
 * function PhoneIdentifierChallengeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Phone identifier challenge resend available')
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

export type { PhoneChallengeOptions, ScreenMembersOnPhoneIdentifierChallenge, PhoneIdentifierChallengeMembers } from '@auth0/auth0-acul-js/phone-identifier-challenge';

export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';