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

// Resend hook
/**
 * Hook to manage the resend functionality for phone identifier challenge.
 * @param payload Optional parameters for the resend functionality.
 * @returns An object containing the resend functionality.
 * @example
 * ```tsx
 * import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';
 * const MyComponent = () => {
 *   const emailChallenge = usePhoneIdentifierChallenge();
 *   const handleStatusChange = (remainingSeconds, isDisabled) => {
 *     setDisabled(isDisabled);
 *     setRemaining(remainingSeconds);
 *   };
 * 
 *   const handleTimeout = () => {
 *     console.log('Timeout completed, resend is now available');
 *   };
 * 
 *   const { startResend } = phoneChallenge.resendManager({
 *     timeoutSeconds: 15,
 *     onStatusChange: handleStatusChange,
 *     onTimeout: handleTimeout
 *   });
 *   
 *   // Call startResend when user clicks resend button
 *   await startResend();
 * ```
 */
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { PhoneChallengeOptions, ScreenMembersOnPhoneIdentifierChallenge, PhoneIdentifierChallengeMembers } from '@auth0/auth0-acul-js/phone-identifier-challenge';

export type * from '@auth0/auth0-acul-js/phone-identifier-challenge';