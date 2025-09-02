import { useMemo } from 'react';
import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaVoiceEnrollmentMembers, ContinueOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-voice-enrollment';
let instance: MfaVoiceEnrollmentMembers | null = null;
const getInstance = (): MfaVoiceEnrollmentMembers => {
  if (!instance) {
    instance = new MfaVoiceEnrollment();
  }
  return instance;
};

export const useMfaVoiceEnrollment = (): MfaVoiceEnrollmentMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const selectPhoneCountryCode = (payload?: CustomOptions) => getInstance().selectPhoneCountryCode(payload);

export type { ContinueOptions, MfaVoiceEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-voice-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-voice-enrollment';