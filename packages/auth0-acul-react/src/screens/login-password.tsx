import { useMemo } from 'react';
import LoginPassword from '@auth0/auth0-acul-js/login-password';
import { ContextHooks } from '../hooks/context-hooks';

import type { LoginPasswordMembers, LoginPasswordOptions, FederatedLoginOptions, ScreenMembersOnLoginPassword, TransactionMembersOnLoginPassword } from '@auth0/auth0-acul-js/login-password';
let instance: LoginPasswordMembers | null = null;
const getInstance = (): LoginPasswordMembers => {
  if (!instance) {
    instance = new LoginPassword();
  }
  return instance;
};

export const useLoginPassword = (): LoginPasswordMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginPasswordMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLoginPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginPassword = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const login = (payload: LoginPasswordOptions) => getInstance().login(payload);
export const federatedLogin = (payload: FederatedLoginOptions) => getInstance().federatedLogin(payload);

export type { ScreenMembersOnLoginPassword, TransactionMembersOnLoginPassword, LoginPasswordOptions, FederatedLoginOptions, LoginPasswordMembers } from '@auth0/auth0-acul-js/login-password';

export type * from '@auth0/auth0-acul-js/login-password';