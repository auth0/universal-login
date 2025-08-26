import { IdentifierType } from '@auth0/auth0-acul-js';

import { getScreen } from '../../state/instance-store';

interface WithLoginIdentifiers {
  getLoginIdentifiers: () => IdentifierType[];
}

/**
 * Returns a list of active identifier types (such as `'email'`, `'phone'`, or `'username'`)
 * currently in use in the authentication flow or signup process.
 *
 * @supportedScreens
 * - `login`
 * - `login-id`
 *
 * @returns An array of {@link IdentifierType} representing active identifiers.
 *
 * @example This example shows how to use the hook in a functional component on "login" screen.
 * ```tsx
 * import { useLoginIdentifiers } from '@auth0/auth0-acul-react/login';
 *
 * const loginIdentifiers = useLoginIdentifiers();
 * const hasEmail = loginIdentifiers.includes('email');
 * const hasPhone = loginIdentifiers.includes('phone');
 * const hasUsername = loginIdentifiers.includes('username');
 *
 * // loginIdentifiers could be:
 * // ['email', 'username']
 * ```
 */

export const useLoginIdentifiers = (): IdentifierType[] | [] => {
  const instance = getScreen<WithLoginIdentifiers>();
  return instance.getLoginIdentifiers() ?? [];
};
