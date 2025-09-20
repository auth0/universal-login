import { useMemo } from 'react';
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
import { ContextHooks } from '../hooks/context';
import type { MfaRecoveryCodeChallengeMembers, ContinueOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaRecoveryCodeChallengeMembers {
  try {
    return getScreen<MfaRecoveryCodeChallengeMembers>();
  } catch {
    const instance = new MfaRecoveryCodeChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaRecoveryCodeChallengeMembers>(getInstance);

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

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaRecoveryCodeChallenge
export const useMfaRecoveryCodeChallenge = (): MfaRecoveryCodeChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';