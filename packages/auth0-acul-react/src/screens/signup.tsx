import { useMemo } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignup, TransactionMembersOnSignup } from '@auth0/auth0-acul-js/signup';
let instance: SignupMembers | null = null;
const getInstance = (): SignupMembers => {
  if (!instance) {
    instance = new Signup();
  }
  return instance;
};

export const useSignup = (): SignupMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignup = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignup = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);

/**
 * Validates a password string against the current password policy
 * by delegating to the instance's `validatePassword` method.
 *
 * This function returns an array of password rule validation results,
 * where each result contains the rule code, description, and whether
 * the password satisfies that rule.
 *
 * @param {string} password - The password string to validate.
 * @returns {PasswordRuleValidation[]} An array of validation results for each password policy rule.
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

/**
 * Retrieves the list of enabled identifiers for the current transaction instance.
 *
 * This function returns an array of `Identifier` objects representing the enabled identifiers 
 * (such as email, phone, username) along with their `required` status, based on the transaction's
 * required and optional identifiers and connection strategy.
 *
 * It internally delegates to the instance's `getEnabledIdentifiers` method, which uses the
 * current transaction data.
 *
 * @returns {Identifier[] | null} An array of enabled identifiers with their required flags,
 * or `null` if no identifiers are available.
 *
 * @example
 * ```ts
 * const enabledIdentifiers = useEnabledIdentifiers();
 * console.log(enabledIdentifiers);
 * // [
 * //   { type: 'email', required: true },
 * //   { type: 'username', required: false }
 * // ]
 * ```
 */
export const useEnabledIdentifiers = () => getInstance().getEnabledIdentifiers();

/**
 * Validates a username string against the current transaction's username policy.
 *
 * This function delegates the validation to the instance's `validateUsername` method,
 * which checks the username for compliance with rules such as:
 * - Minimum and maximum length
 * - Allowed username formats (email or phone number formats)
 * - Presence if no policy is defined
 *
 * @param {string} username - The username string to validate.
 * @returns {UsernameValidationResult} The validation result containing:
 *  - `isValid`: boolean indicating if the username passed all checks.
 *  - `errors`: an array of validation errors, if any.
 *
 * @example
 * ```ts
 * const result = useUsernameValidation('john.doe@example.com');
 * if (!result.isValid) {
 *   console.log(result.errors);
 * }
 * ```
 */
export const useUsernameValidation = (username: string) => getInstance().validateUsername(username);

export type { SignupOptions, FederatedSignupOptions, ScreenMembersOnSignup, TransactionMembersOnSignup, SignupMembers } from '@auth0/auth0-acul-js/signup';

export type * from '@auth0/auth0-acul-js/signup';