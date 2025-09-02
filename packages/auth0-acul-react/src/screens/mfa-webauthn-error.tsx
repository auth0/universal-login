import { useMemo } from 'react';
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnErrorMembers, CustomOptions, ScreenMembersOnMfaWebAuthnError } from '@auth0/auth0-acul-js/mfa-webauthn-error';
let instance: MfaWebAuthnErrorMembers | null = null;
const getInstance = (): MfaWebAuthnErrorMembers => {
  if (!instance) {
    instance = new MfaWebAuthnError();
  }
  return instance;
};

export const useMfaWebAuthnError = (): MfaWebAuthnErrorMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaWebAuthnErrorMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaWebAuthnError = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const tryAgain = (payload?: CustomOptions) => getInstance().tryAgain(payload);
export const usePassword = (payload?: CustomOptions) => getInstance().usePassword(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const noThanks = (payload?: CustomOptions) => getInstance().noThanks(payload);

export type { ScreenMembersOnMfaWebAuthnError, MfaWebAuthnErrorMembers } from '@auth0/auth0-acul-js/mfa-webauthn-error';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-error';