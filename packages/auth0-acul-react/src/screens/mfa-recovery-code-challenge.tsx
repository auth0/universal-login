import { useMemo } from 'react';
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaRecoveryCodeChallengeMembers, ContinueOptions, CustomOptions } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
let instance: MfaRecoveryCodeChallengeMembers | null = null;
const getInstance = (): MfaRecoveryCodeChallengeMembers => {
  if (!instance) {
    instance = new MfaRecoveryCodeChallenge();
  }
  return instance;
};

export const useMfaRecoveryCodeChallenge = (): MfaRecoveryCodeChallengeMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload: ContinueOptions) => getInstance().continue(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { ContinueOptions, MfaRecoveryCodeChallengeMembers } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

export type * from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';