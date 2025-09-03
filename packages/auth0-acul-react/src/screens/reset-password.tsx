import { useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMembers, ResetPasswordOptions, ScreenMembersOnResetPassword } from '@auth0/auth0-acul-js/reset-password';
let instance: ResetPasswordMembers | null = null;
const getInstance = (): ResetPasswordMembers => {
  if (!instance) {
    instance = new ResetPassword();
  }
  return instance;
};

export const useResetPassword = (): ResetPasswordMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const resetPassword = (payload: ResetPasswordOptions) => getInstance().resetPassword(payload);

export type { ResetPasswordOptions, ScreenMembersOnResetPassword, ResetPasswordMembers } from '@auth0/auth0-acul-js/reset-password';

export type * from '@auth0/auth0-acul-js/reset-password';