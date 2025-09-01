import { useMemo } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupPasswordMembers, SignupPasswordOptions, FederatedSignupOptions, ScreenMembersOnSignupPassword, TransactionMembersOnSignupPassword } from '@auth0/auth0-acul-js/signup-password';
let instance: SignupPasswordMembers | null = null;
const getInstance = (): SignupPasswordMembers => {
  if (!instance) {
    instance = new SignupPassword();
  }
  return instance;
};

export const useSignupPassword = (): SignupPasswordMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupPasswordMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignupPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupPassword = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupPasswordOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);
export const validatePassword = (password: string) => getInstance().validatePassword(password);

export type { FederatedSignupOptions, ScreenMembersOnSignupPassword, TransactionMembersOnSignupPassword, SignupPasswordOptions, SignupPasswordMembers } from '@auth0/auth0-acul-js/signup-password';

export type * from '@auth0/auth0-acul-js/signup-password';