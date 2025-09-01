import { useMemo } from 'react';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordRequestMembers, ResetPasswordRequestOptions, CustomOptions, ScreenMembersOnResetPasswordRequest, TransactionMembersOnResetPasswordRequest } from '@auth0/auth0-acul-js/reset-password-request';
let instance: ResetPasswordRequestMembers | null = null;
const getInstance = (): ResetPasswordRequestMembers => {
  if (!instance) {
    instance = new ResetPasswordRequest();
  }
  return instance;
};

export const useResetPasswordRequest = (): ResetPasswordRequestMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordRequestMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordRequest = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnResetPasswordRequest = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const resetPassword = (payload: ResetPasswordRequestOptions) => getInstance().resetPassword(payload);
export const backToLogin = (payload?: CustomOptions) => getInstance().backToLogin(payload);

export type { ResetPasswordRequestOptions, TransactionMembersOnResetPasswordRequest, ScreenMembersOnResetPasswordRequest, ResetPasswordRequestMembers } from '@auth0/auth0-acul-js/reset-password-request';

export type * from '@auth0/auth0-acul-js/reset-password-request';