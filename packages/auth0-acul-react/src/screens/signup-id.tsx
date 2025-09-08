import { useMemo } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupIdMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignupId, TransactionMembersOnSignupId } from '@auth0/auth0-acul-js/signup-id';
let instance: SignupIdMembers | null = null;
const getInstance = (): SignupIdMembers => {
  if (!instance) {
    instance = new SignupId();
  }
  return instance;
};

export const useSignupId = (): SignupIdMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupIdMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignupId = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupId = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);
export const useEnabledIdentifiers = () => getInstance().getEnabledIdentifiers();
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);
export const useUsernameValidation = (username: string) => getInstance().validateUsername(username);

export type { ScreenMembersOnSignupId, TransactionMembersOnSignupId, FederatedSignupOptions, SignupOptions, SignupIdMembers } from '@auth0/auth0-acul-js/signup-id';

export type * from '@auth0/auth0-acul-js/signup-id';