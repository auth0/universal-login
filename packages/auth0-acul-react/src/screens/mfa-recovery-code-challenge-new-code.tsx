import { useMemo } from 'react';
import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaRecoveryCodeChallengeNewCodeMembers, ContinueOptions, ScreenMembersOnMfaRecoveryCodeChallengeNewCode } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';
let instance: MfaRecoveryCodeChallengeNewCodeMembers | null = null;
const getInstance = (): MfaRecoveryCodeChallengeNewCodeMembers => {
  if (!instance) {
    instance = new MfaRecoveryCodeChallengeNewCode();
  }
  return instance;
};

export const useMfaRecoveryCodeChallengeNewCode = (): MfaRecoveryCodeChallengeNewCodeMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaRecoveryCodeChallengeNewCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload?: ContinueOptions) => getInstance().continue(payload);

export type { ScreenMembersOnMfaRecoveryCodeChallengeNewCode, ContinueOptions, MfaRecoveryCodeChallengeNewCodeMembers } from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';

export type * from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';