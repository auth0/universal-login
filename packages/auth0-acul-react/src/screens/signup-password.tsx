import { useMemo } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupPasswordMembers, SignupPasswordOptions, FederatedSignupOptions, ScreenMembersOnSignupPassword, TransactionMembersOnSignupPassword } from '@auth0/auth0-acul-js/signup-password';
let instance: SignupPasswordMembers | null = null;
const getInstance = (): SignupPasswordMembers => {
  if (!instance) {
    instance = new SignupPassword();
  }
  return instance;
};

export const useSignupPassword = (): SignupPasswordMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupPasswordMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignupPassword = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupPassword = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupPasswordOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);

/**
 * Validates a password string against the current password policy
 * by delegating to the instance's `validatePassword` method.
 *
 * This function returns an array of password rule validation results,
 * where each result contains the rule code, description, and whether
 * the password satisfies that rule.
 *
 * @param {string} password - The password string to validate.
 * @returns {PasswordValidationResult}
 *
 * @example
 * ```ts
 * const results = usePasswordValidation('P@ssword123');
 * console.log(results);
 * // [
 * //   { code: 'password-policy-length-at-least', policy: 'At least 12 characters', isValid: false },
 * //   { code: 'password-policy-lower-case', policy: 'Lowercase letters (a-z)', isValid: true },
 * //   ...
 * // ]
 * ```
 */
export const usePasswordValidation = (password: string) => getInstance().validatePassword(password);

export type { FederatedSignupOptions, ScreenMembersOnSignupPassword, TransactionMembersOnSignupPassword, SignupPasswordOptions, SignupPasswordMembers } from '@auth0/auth0-acul-js/signup-password';

export type * from '@auth0/auth0-acul-js/signup-password';