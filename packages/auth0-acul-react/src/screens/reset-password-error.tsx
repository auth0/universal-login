import { useMemo } from 'react';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordErrorMembers, ScreenMembersOnResetPasswordError } from '@auth0/auth0-acul-js/reset-password-error';
let instance: ResetPasswordErrorMembers | null = null;
const getInstance = (): ResetPasswordErrorMembers => {
  if (!instance) {
    instance = new ResetPasswordError();
  }
  return instance;
};

export const useResetPasswordError = (): ResetPasswordErrorMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordErrorMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordError = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

export type { ScreenMembersOnResetPasswordError, ResetPasswordErrorMembers } from '@auth0/auth0-acul-js/reset-password-error';

export type * from '@auth0/auth0-acul-js/reset-password-error';