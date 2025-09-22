import { useMemo } from 'react';

import { getScreen } from '../../state/instance-store';
import { errorManager } from '../common/errors';

import type { PasswordValidationResult } from '@auth0/auth0-acul-js';

interface WithValidatePassword {
  validatePassword: (password: string) => PasswordValidationResult;
}

/**
 * This React hook validates a password against the current Auth0 password policy
 * and returns a structured result describing whether the password satisfies each rule.
 *
 * Optionally, it can send the validation results to the global error manager so that
 * form error components can update automatically.
 *
 * @SupportedScreens
 * - `signup`
 * - `signup-password`
 * - `reset-password`
 *
 * @param password
 * - The password to validate.
 * @param options.includeInErrors
 * - If `true`, validation errors are stored in the global error manager under the `password` field. Defaults to `false`.
 *
 * @returns A {@link PasswordValidationResult} object containing:
 * - `isValid` — `true` if the password satisfies all configured rules.
 * - `results` — an array of per-rule results with `code`, `label`, `status`, and `isValid`.
 *
 * @example This example shows how to use the hook in a functional component on "signup" screen.
 * ```tsx
 *    import { usePasswordValidation } from '@auth0/auth0-acul-react/signup';
 *    const { isValid, results} = usePasswordValidation(password, { includeInErrors: true });
 *
 *    if (!isValid) {
 *      console.log(results);
 *    }
 * ```
 */
export function usePasswordValidation(
  password: string,
  options?: { includeInErrors?: boolean }
): PasswordValidationResult {
  return useMemo(() => {
    const instance = getScreen<WithValidatePassword>();
    const validation = instance.validatePassword(password);

    if (options?.includeInErrors) {
      errorManager.replaceClientErrors(
        [
          {
            code: 'password-policy-error',
            field: 'password',
            message: 'The password does not meet the required criteria.',
            rules: validation.results,
          },
        ],
        { byField: 'password' }
      );
    }

    return validation;
  }, [password, options?.includeInErrors]);
}

export { PasswordValidationResult, PasswordComplexityRule } from '@auth0/auth0-acul-js';
