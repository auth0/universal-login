import { useMemo } from 'react';
import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
import { ContextHooks } from '../hooks/context';
import type { MfaRecoveryCodeChallengeNewCodeMembers, ContinueOptions, ScreenMembersOnMfaRecoveryCodeChallengeNewCode } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaRecoveryCodeChallengeNewCodeMembers {
  try {
    return getScreen<MfaRecoveryCodeChallengeNewCodeMembers>();
  } catch {
    const instance = new MfaRecoveryCodeChallengeNewCode();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaRecoveryCodeChallengeNewCodeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaRecoveryCodeChallengeNewCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload?: ContinueOptions) => withError(getInstance().continue(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaRecoveryCodeChallengeNewCode
export const useMfaRecoveryCodeChallengeNewCode = (): MfaRecoveryCodeChallengeNewCodeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';