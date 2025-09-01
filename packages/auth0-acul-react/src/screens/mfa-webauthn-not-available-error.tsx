import { useMemo } from 'react';
import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaWebAuthnNotAvailableErrorMembers, CustomOptions } from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
let instance: MfaWebAuthnNotAvailableErrorMembers | null = null;
const getInstance = (): MfaWebAuthnNotAvailableErrorMembers => {
  if (!instance) {
    instance = new MfaWebAuthnNotAvailableError();
  }
  return instance;
};

export const useMfaWebAuthnNotAvailableError = (): MfaWebAuthnNotAvailableErrorMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaWebAuthnNotAvailableErrorMembers>(getInstance);

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
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);

export type { MfaWebAuthnNotAvailableErrorMembers } from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';

export type * from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';