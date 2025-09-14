import { useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { EmailIdentifierChallengeMembers, EmailChallengeOptions, CustomOptions, ScreenMembersOnEmailIdentifierChallenge } from '@auth0/auth0-acul-js/email-identifier-challenge';

let instance: EmailIdentifierChallengeMembers | null = null;
const getInstance = (): EmailIdentifierChallengeMembers => {
  if (!instance) {
    instance = new EmailIdentifierChallenge();
  }
  return instance;
};

export const useEmailIdentifierChallenge = (): EmailIdentifierChallengeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<EmailIdentifierChallengeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnEmailIdentifierChallenge = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitEmailChallenge = (payload: EmailChallengeOptions) => getInstance().submitEmailChallenge(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);
export const returnToPrevious = (payload?: CustomOptions) => getInstance().returnToPrevious(payload);

/**
 * Hook for managing email resend functionality in email identifier challenge screen.
 *
 * This hook provides functionality to resend email identifier challenges 
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
 * function EmailIdentifierChallengeForm() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 60,
 *     onTimeout: () => console.log('Email identifier challenge resend available')
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

export type { EmailChallengeOptions, ScreenMembersOnEmailIdentifierChallenge, EmailIdentifierChallengeMembers } from '@auth0/auth0-acul-js/email-identifier-challenge';

export type * from '@auth0/auth0-acul-js/email-identifier-challenge';