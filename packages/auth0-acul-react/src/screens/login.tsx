import { useMemo } from 'react';
import Login from '@auth0/auth0-acul-js/login';
import { ContextHooks } from '../hooks/context-hooks';

import type { LoginMembers, LoginOptions, FederatedLoginOptions, ScreenMembersOnLogin, TransactionMembersOnLogin } from '@auth0/auth0-acul-js/login';
let instance: LoginMembers | null = null;
const getInstance = (): LoginMembers => {
  if (!instance) {
    instance = new Login();
  }
  return instance;
};

export const useLogin = (): LoginMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<LoginMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnLogin = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnLogin = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const login = (payload: LoginOptions) => getInstance().login(payload);
export const federatedLogin = (payload: FederatedLoginOptions) => getInstance().federatedLogin(payload);

/**
 * Retrieves the active identifier types for the current transaction instance.
 *
 * This function returns an array of active identifier types (e.g., `email`, `phone`, `username`)
 * or `null` if no active identifiers are set.
 *
 * It internally calls the instance's `getActiveIdentifiers` method.
 *
 * @returns {string[] | null} An array of active identifier types or `null` if none are active.
 *
 * @example
 * ```ts
 * const activeIds = useActiveIdentifiers();
 * console.log(activeIds);
 * // ['email', 'username']
 * ```
 */
export const useActiveIdentifiers = () => getInstance().getActiveIdentifiers();

export type { ScreenMembersOnLogin, TransactionMembersOnLogin, LoginOptions, FederatedLoginOptions, LoginMembers } from '@auth0/auth0-acul-js/login';

export type * from '@auth0/auth0-acul-js/login';