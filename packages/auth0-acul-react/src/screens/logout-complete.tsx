import { useMemo } from 'react';
import LogoutComplete from '@auth0/auth0-acul-js/logout-complete';
import { ContextHooks } from '../hooks/context-hooks';

import type { LogoutCompleteMembers } from '@auth0/auth0-acul-js/logout-complete';
let instance: LogoutCompleteMembers | null = null;
const getInstance = (): LogoutCompleteMembers => {
  if (!instance) {
    instance = new LogoutComplete();
  }
  return instance;
};

export const useLogoutComplete = (): LogoutCompleteMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LogoutCompleteMembers>(getInstance);

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

export type { LogoutCompleteMembers } from '@auth0/auth0-acul-js/logout-complete';

export type * from '@auth0/auth0-acul-js/logout-complete';