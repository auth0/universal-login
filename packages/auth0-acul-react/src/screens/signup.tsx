import { useMemo } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignup, TransactionMembersOnSignup } from '@auth0/auth0-acul-js/signup';
let instance: SignupMembers | null = null;
const getInstance = (): SignupMembers => {
  if (!instance) {
    instance = new Signup();
  }
  return instance;
};

export const useSignup = (): SignupMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignup = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignup = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);
export const usePasswordValidation = (password: string) => getInstance().validatePassword(password);
export const useEnabledIdentifiers = () => getInstance().getEnabledIdentifiers();

export type { SignupOptions, FederatedSignupOptions, ScreenMembersOnSignup, TransactionMembersOnSignup, SignupMembers } from '@auth0/auth0-acul-js/signup';

export type * from '@auth0/auth0-acul-js/signup';