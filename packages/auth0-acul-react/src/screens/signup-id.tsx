import { useMemo } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { ContextHooks } from '../hooks/context-hooks';

import type { SignupIdMembers, SignupOptions, FederatedSignupOptions, CustomOptions, ScreenMembersOnSignupId, TransactionMembersOnSignupId } from '@auth0/auth0-acul-js/signup-id';
let instance: SignupIdMembers | null = null;
const getInstance = (): SignupIdMembers => {
  if (!instance) {
    instance = new SignupId();
  }
  return instance;
};

export const useSignupId = (): SignupIdMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<SignupIdMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnSignupId = () => useMemo(() => getInstance().screen, []);
export const useTransaction: () => TransactionMembersOnSignupId = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const signup = (payload: SignupOptions) => getInstance().signup(payload);
export const federatedSignup = (payload: FederatedSignupOptions) => getInstance().federatedSignup(payload);

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
export const pickCountryCode = (payload?: CustomOptions) => getInstance().pickCountryCode(payload);

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

export type { ScreenMembersOnSignupId, TransactionMembersOnSignupId, FederatedSignupOptions, SignupOptions, SignupIdMembers } from '@auth0/auth0-acul-js/signup-id';

export type * from '@auth0/auth0-acul-js/signup-id';