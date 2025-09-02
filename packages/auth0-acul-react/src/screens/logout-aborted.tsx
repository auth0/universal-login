import { useMemo } from 'react';
import LogoutAborted from '@auth0/auth0-acul-js/logout-aborted';
import { ContextHooks } from '../hooks/context-hooks';

import type { LogoutAbortedMembers } from '@auth0/auth0-acul-js/logout-aborted';
let instance: LogoutAbortedMembers | null = null;
const getInstance = (): LogoutAbortedMembers => {
  if (!instance) {
    instance = new LogoutAborted();
  }
  return instance;
};

export const useLogoutAborted = (): LogoutAbortedMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LogoutAbortedMembers>(getInstance);

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

export type { LogoutAbortedMembers } from '@auth0/auth0-acul-js/logout-aborted';

export type * from '@auth0/auth0-acul-js/logout-aborted';