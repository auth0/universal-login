import { useMemo } from 'react';
import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaRecoveryCodeEnrollmentMembers, MfaRecoveryCodeEnrollmentContinueOptions, ScreenMembersOnMfaRecoveryCodeEnrollment } from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
let instance: MfaRecoveryCodeEnrollmentMembers | null = null;
const getInstance = (): MfaRecoveryCodeEnrollmentMembers => {
  if (!instance) {
    instance = new MfaRecoveryCodeEnrollment();
  }
  return instance;
};

export const useMfaRecoveryCodeEnrollment = (): MfaRecoveryCodeEnrollmentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaRecoveryCodeEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaRecoveryCodeEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: MfaRecoveryCodeEnrollmentContinueOptions) => getInstance().continue(payload);

export type { ScreenMembersOnMfaRecoveryCodeEnrollment, MfaRecoveryCodeEnrollmentContinueOptions, MfaRecoveryCodeEnrollmentMembers } from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';

export type * from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';