import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  PhoneIdentifierChallengeMembers,
  PhoneChallengeOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/phone-identifier-challenge';

// Register the singleton instance of PhoneIdentifierChallenge
const instance = registerScreen<PhoneIdentifierChallengeMembers>(PhoneIdentifierChallenge)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<PhoneIdentifierChallengeMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const submitPhoneChallenge = (payload: PhoneChallengeOptions) =>
  withError(instance.submitPhoneChallenge(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const returnToPrevious = (payload?: CustomOptions) =>
  withError(instance.returnToPrevious(payload));
export const switchToVoice = (payload?: CustomOptions) =>
  withError(instance.switchToVoice(payload));
export const switchToText = (payload?: CustomOptions) => withError(instance.switchToText(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of PhoneIdentifierChallenge
export const usePhoneIdentifierChallenge = (): PhoneIdentifierChallengeMembers =>
  useMemo(() => instance, []);
