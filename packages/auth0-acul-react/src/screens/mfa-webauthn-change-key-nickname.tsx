import { useMemo } from 'react';
import MfaWebAuthnChangeKeyNickname from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';
import { ContextHooks } from '../hooks/context';
import type { MfaWebAuthnChangeKeyNicknameMembers, ContinueOptions, ScreenMembersOnMfaWebAuthnChangeKeyNickname } from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaWebAuthnChangeKeyNicknameMembers {
  try {
    return getScreen<MfaWebAuthnChangeKeyNicknameMembers>();
  } catch {
    const instance = new MfaWebAuthnChangeKeyNickname();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen: () => ScreenMembersOnMfaWebAuthnChangeKeyNickname = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueWithNewNickname = (payload: ContinueOptions) => withError(getInstance().continueWithNewNickname(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaWebAuthnChangeKeyNickname
export const useMfaWebAuthnChangeKeyNickname = (): MfaWebAuthnChangeKeyNicknameMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';