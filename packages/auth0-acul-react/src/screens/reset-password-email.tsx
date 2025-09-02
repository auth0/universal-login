import { useMemo } from 'react';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordEmailMembers, CustomOptions, ScreenMembersOnResetPasswordEmail } from '@auth0/auth0-acul-js/reset-password-email';
let instance: ResetPasswordEmailMembers | null = null;
const getInstance = (): ResetPasswordEmailMembers => {
  if (!instance) {
    instance = new ResetPasswordEmail();
  }
  return instance;
};

export const useResetPasswordEmail = (): ResetPasswordEmailMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<ResetPasswordEmailMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordEmail = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const resendEmail = (payload?: CustomOptions) => getInstance().resendEmail(payload);

export type { ResetPasswordEmailOptions, ScreenMembersOnResetPasswordEmail, ResetPasswordEmailMembers } from '@auth0/auth0-acul-js/reset-password-email';

export type * from '@auth0/auth0-acul-js/reset-password-email';