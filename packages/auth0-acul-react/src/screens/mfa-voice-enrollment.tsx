import { useMemo } from 'react';
import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaVoiceEnrollmentMembers, ContinueOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaVoiceEnrollmentMembers {
  try {
    return getScreen<MfaVoiceEnrollmentMembers>();
  } catch {
    const instance = new MfaVoiceEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaVoiceEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: ContinueOptions) => withError(getInstance().continue(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));
export const selectPhoneCountryCode = (payload?: CustomOptions) => withError(getInstance().selectPhoneCountryCode(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaVoiceEnrollment
export const useMfaVoiceEnrollment = (): MfaVoiceEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-voice-enrollment';