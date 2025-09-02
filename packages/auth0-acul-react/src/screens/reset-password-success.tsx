import { useMemo } from 'react';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordSuccessMembers, ScreenMembersOnResetPasswordSuccess } from '@auth0/auth0-acul-js/reset-password-success';
let instance: ResetPasswordSuccessMembers | null = null;
const getInstance = (): ResetPasswordSuccessMembers => {
  if (!instance) {
    instance = new ResetPasswordSuccess();
  }
  return instance;
};

export const useResetPasswordSuccess = (): ResetPasswordSuccessMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordSuccessMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordSuccess = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

export type { ScreenMembersOnResetPasswordSuccess, ResetPasswordSuccessMembers } from '@auth0/auth0-acul-js/reset-password-success';

export type * from '@auth0/auth0-acul-js/reset-password-success';