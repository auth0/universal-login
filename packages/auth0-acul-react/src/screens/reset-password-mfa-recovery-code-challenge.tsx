import { useMemo } from 'react';
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaRecoveryCodeChallengeMembers, CustomOptions } from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
let instance: ResetPasswordMfaRecoveryCodeChallengeMembers | null = null;
const getInstance = (): ResetPasswordMfaRecoveryCodeChallengeMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaRecoveryCodeChallenge();
  }
  return instance;
};

export const useResetPasswordMfaRecoveryCodeChallenge = (): ResetPasswordMfaRecoveryCodeChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (code: string, payload?: CustomOptions) => getInstance().continue(code, payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { ResetPasswordMfaRecoveryCodeChallengeMembers } from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';