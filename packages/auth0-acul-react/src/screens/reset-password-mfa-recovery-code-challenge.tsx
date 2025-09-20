import { useMemo } from 'react';
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaRecoveryCodeChallengeMembers, CustomOptions } from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaRecoveryCodeChallengeMembers {
  try {
    return getScreen<ResetPasswordMfaRecoveryCodeChallengeMembers>();
  } catch {
    const instance = new ResetPasswordMfaRecoveryCodeChallenge();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaRecoveryCodeChallengeMembers>(getInstance);

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
export const continueMethod = (code: string, payload?: CustomOptions) => withError(getInstance().continue(code, payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaRecoveryCodeChallenge
export const useResetPasswordMfaRecoveryCodeChallenge = (): ResetPasswordMfaRecoveryCodeChallengeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';