import { useMemo } from 'react';
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { ContextHooks } from '../hooks/context-hooks';

import type { LoginPasswordlessEmailCodeMembers, SubmitCodeOptions, CustomOptions, ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode } from '@auth0/auth0-acul-js/login-passwordless-email-code';
let instance: LoginPasswordlessEmailCodeMembers | null = null;
const getInstance = (): LoginPasswordlessEmailCodeMembers => {
  if (!instance) {
    instance = new LoginPasswordlessEmailCode();
  }
  return instance;
};

export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPasswordlessEmailCode = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const submitCode = (payload: SubmitCodeOptions) => getInstance().submitCode(payload);
export const resendCode = (payload?: CustomOptions) => getInstance().resendCode(payload);

export type { ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode, SubmitCodeOptions, LoginPasswordlessEmailCodeMembers } from '@auth0/auth0-acul-js/login-passwordless-email-code';

export type * from '@auth0/auth0-acul-js/login-passwordless-email-code';