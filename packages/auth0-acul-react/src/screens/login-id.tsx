import { useMemo } from 'react';
import LoginId from '@auth0/auth0-acul-js/login-id';
import { ContextHooks } from '../hooks/context-hooks';

import type { LoginIdMembers, LoginOptions, FederatedLoginOptions, CustomOptions, ScreenMembersOnLoginId, TransactionMembersOnLoginId } from '@auth0/auth0-acul-js/login-id';
let instance: LoginIdMembers | null = null;
const getInstance = (): LoginIdMembers => {
  if (!instance) {
    instance = new LoginId();
  }
  return instance;
};

export const useLoginId = (): LoginIdMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginIdMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLoginId = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLoginId = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const login = (payload: LoginOptions) => getInstance().login(payload);
export const federatedLogin = (payload: FederatedLoginOptions) => getInstance().federatedLogin(payload);
export const passkeyLogin = (payload?: CustomOptions) => getInstance().passkeyLogin(payload);
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);
export const useActiveIdentifiers = () => getInstance().getActiveIdentifiers();

export type { ScreenMembersOnLoginId, TransactionMembersOnLoginId, LoginOptions, FederatedLoginOptions, LoginIdMembers } from '@auth0/auth0-acul-js/login-id';

export type * from '@auth0/auth0-acul-js/login-id';