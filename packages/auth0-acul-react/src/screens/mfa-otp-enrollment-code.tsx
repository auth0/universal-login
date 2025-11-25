import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaOtpEnrollmentCodeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

// Register the singleton instance of MfaOtpEnrollmentCode
const instance = registerScreen<MfaOtpEnrollmentCodeMembers>(MfaOtpEnrollmentCode)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaOtpEnrollmentCodeMembers>(instance);
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
export const continueMethod = (payload: ContinueOptions) => withError(instance.continue(payload));
export const tryAnotherMethod = (payload?: TryAnotherMethodOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaOtpEnrollmentCode
export const useMfaOtpEnrollmentCode = (): MfaOtpEnrollmentCodeMembers =>
  useMemo(() => instance, []);
