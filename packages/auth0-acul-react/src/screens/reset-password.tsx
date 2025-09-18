import { useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { ContextHooks } from '../hooks/context-hooks';
import { usePasswordValidation } from '../hooks/utility-hooks/validate-password';
import { useErrors } from '../hooks/common/use-errors';
import { setScreen, getScreen  } from '../state/instance-store';

import type { ResetPasswordMembers, ResetPasswordOptions, ScreenMembersOnResetPassword } from '@auth0/auth0-acul-js/reset-password';

function getInstance(): ResetPasswordMembers {
  try {
    return getScreen<ResetPasswordMembers>();
  } catch {
    const inst = new ResetPassword();
    setScreen(inst);
    return inst;
  }
}

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

export { usePasswordValidation };
export { useErrors };