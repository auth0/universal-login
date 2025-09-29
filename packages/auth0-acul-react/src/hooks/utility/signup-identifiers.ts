import { getScreen } from '../../state/instance-store';

import type { Identifier } from '@auth0/auth0-acul-js';

interface WithSignupIdentifiers {
  getSignupIdentifiers: () => Identifier[];
}

/**
 * Returns a list of enabled identifiers (email, phone, or username), each with its `required` status,
 * based on the current screen's signup identifiers.
 *
 * @supportedScreens
 * - `signup`
 * - `signup-id`
 *
 * @returns An array of {@link Identifier} objects, where each contains a `type` (identifier type)
 * and a `required` flag indicating whether it is mandatory for signup.
 *
 * @example
 * ```tsx
 * import { useSignupIdentifiers } from '@auth0/auth0-acul-react/signup';
 *
 * const identifiers = useSignupIdentifiers();
 * const emailIdentifier = identifiers.find(({ type }) => type === 'email');
 * const phoneIdentifier = identifiers.find(({ type }) => type === 'phone');
 * const usernameIdentifier = identifiers.find(({ type }) => type === 'username');
 *
 * const emailRequired = emailIdentifier?.required ?? false;
 * const phoneRequired = phoneIdentifier?.required ?? false;
 * const usernameRequired = usernameIdentifier?.required ?? false;
 *
 * // Example output:
 * // [
 * //   { type: 'email', required: true },
 * //   { type: 'phone', required: false },
 * //   { type: 'username', required: true },
 * // ]
 * ```
 */

export const useSignupIdentifiers = (): Identifier[] | [] => {
  const instance = getScreen<WithSignupIdentifiers>();
  return instance.getSignupIdentifiers() ?? [];
};
