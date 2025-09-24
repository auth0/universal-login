import { useMemo } from 'react';

import { getScreen } from '../../state/instance-store';
import { errorManager } from '../common/errors';

import type { UsernameValidationResult } from '@auth0/auth0-acul-js';

interface WithValidateUsername {
  validateUsername: (username: string) => UsernameValidationResult;
}

/**
 * React hook for validating a username against the current Auth0 username policy.
 *
 * This hook checks the provided username against all configured validation rules
 * and returns a structured result describing whether it passes.
 * Optionally, it can send validation errors to the global error manager so that
 * UI components observing the `username` field can automatically display or react
 * to these errors.
 *
 * @SupportedScreens
 * - `signup`
 * - `signup-id`
 *
 * @param username - The username string to validate.
 * @param options.includeInErrors - When `true`, validation errors are stored in the
 *   global error manager under the `username` field. Defaults to `false`.
 *
 * @returns A {@link UsernameValidationResult} object with:
 * - `isValid` — `true` if the username satisfies all configured rules.
 * - `errors` — an array of per-rule validation errors with `code`, `message`, and `isValid`.
 *
 * @example
 * ```tsx
 * import { useUsernameValidation } from "@auth0/auth0-acul-react/signup";
 *
 * export function UsernameField() {
 *   const { isValid, errors } = useUsernameValidation(username, { includeInErrors: true });
 *
 *   return (
 *     <div>
 *       <input
 *         value={username}
 *         onChange={e => setUsername(e.target.value)}
 *         aria-invalid={!isValid}
 *       />
 *
 *       {!isValid && (
 *         <ul>
 *           {errors.map(err => (
 *             <li key={err.code}>{err.message}</li>
 *           ))}
 *         </ul>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - When `includeInErrors` is enabled, the hook automatically updates the errors to the error-store
 *  which can be consumed by `useErrors` hook.
 * - The hook only recomputes when `username` or `options.includeInErrors` change.
 */
export function useUsernameValidation(
  username: string,
  options?: { includeInErrors?: boolean }
): UsernameValidationResult {
  return useMemo(() => {
    const instance = getScreen<WithValidateUsername>();
    const result = instance.validateUsername(username);

    if (options?.includeInErrors) {
      errorManager.replaceClientErrors(result.errors, { byField: 'username' });
    }

    return { isValid: result.isValid, errors: result.errors };
  }, [username, options?.includeInErrors]);
}

export type { UsernameValidationResult, UsernameValidationError } from '@auth0/auth0-acul-js';
