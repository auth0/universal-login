import { useMemo } from 'react';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaLoginOptionsMembers, LoginEnrollOptions, ScreenMembersOnMfaLoginOptions } from '@auth0/auth0-acul-js/mfa-login-options';
let instance: MfaLoginOptionsMembers | null = null;
const getInstance = (): MfaLoginOptionsMembers => {
  if (!instance) {
    instance = new MfaLoginOptions();
  }
  return instance;
};

export const useMfaLoginOptions = (): MfaLoginOptionsMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaLoginOptionsMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaLoginOptions = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const enroll = (payload: LoginEnrollOptions) => getInstance().enroll(payload);

export type { ScreenMembersOnMfaLoginOptions, LoginEnrollOptions, MfaLoginOptionsMembers } from '@auth0/auth0-acul-js/mfa-login-options';

export type * from '@auth0/auth0-acul-js/mfa-login-options';