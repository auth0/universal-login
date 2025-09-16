import { useMemo } from 'react';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import { ContextHooks } from '../hooks/context-hooks';
import { validatePassword } from '../hooks/utility-hooks/validate-password';
import { createUseErrors } from '../hooks/common/use-errors';

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

// @ts-ignore
export const { useErrors } = createUseErrors(getInstance);
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
export const usePasswordValidation = (password: string) => validatePassword( password, getInstance);

export type { ResetPasswordOptions, ScreenMembersOnResetPassword, ResetPasswordMembers } from '@auth0/auth0-acul-js/reset-password';

export type * from '@auth0/auth0-acul-js/reset-password';