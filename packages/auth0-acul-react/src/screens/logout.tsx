import { useMemo } from 'react';
import Logout from '@auth0/auth0-acul-js/logout';
import { ContextHooks } from '../hooks/context-hooks';

import type { LogoutMembers, ConfirmLogoutOptions } from '@auth0/auth0-acul-js/logout';
let instance: LogoutMembers | null = null;
const getInstance = (): LogoutMembers => {
  if (!instance) {
    instance = new Logout();
  }
  return instance;
};

export const useLogout = (): LogoutMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LogoutMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const confirmLogout = (payload: ConfirmLogoutOptions) => getInstance().confirmLogout(payload);

export type { ConfirmLogoutOptions, LogoutMembers } from '@auth0/auth0-acul-js/logout';

export type * from '@auth0/auth0-acul-js/logout';