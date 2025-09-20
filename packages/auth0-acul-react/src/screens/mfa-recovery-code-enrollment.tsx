import { useMemo } from 'react';
import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
import { ContextHooks } from '../hooks/context';
import type { MfaRecoveryCodeEnrollmentMembers, MfaRecoveryCodeEnrollmentContinueOptions, ScreenMembersOnMfaRecoveryCodeEnrollment } from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaRecoveryCodeEnrollmentMembers {
  try {
    return getScreen<MfaRecoveryCodeEnrollmentMembers>();
  } catch {
    const instance = new MfaRecoveryCodeEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnMfaRecoveryCodeEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload: MfaRecoveryCodeEnrollmentContinueOptions) => withError(getInstance().continue(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaRecoveryCodeEnrollment
export const useMfaRecoveryCodeEnrollment = (): MfaRecoveryCodeEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';