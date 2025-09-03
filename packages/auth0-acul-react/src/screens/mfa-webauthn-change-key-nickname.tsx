import { useMemo } from 'react';
import MfaWebAuthnChangeKeyNickname from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnChangeKeyNicknameMembers, ContinueOptions, ScreenMembersOnMfaWebAuthnChangeKeyNickname } from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';
let instance: MfaWebAuthnChangeKeyNicknameMembers | null = null;
const getInstance = (): MfaWebAuthnChangeKeyNicknameMembers => {
  if (!instance) {
    instance = new MfaWebAuthnChangeKeyNickname();
  }
  return instance;
};

export const useMfaWebAuthnChangeKeyNickname = (): MfaWebAuthnChangeKeyNicknameMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaWebAuthnChangeKeyNicknameMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaWebAuthnChangeKeyNickname = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueWithNewNickname = (payload: ContinueOptions) => getInstance().continueWithNewNickname(payload);

export type { ScreenMembersOnMfaWebAuthnChangeKeyNickname, ContinueOptions, MfaWebAuthnChangeKeyNicknameMembers } from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';