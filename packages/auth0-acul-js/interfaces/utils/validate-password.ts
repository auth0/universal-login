import type { PasswordComplexityRule } from "../../interfaces/models/transaction";

/**
 * Represents the full outcome of validating a password against an Auth0
 * {@link PasswordPolicy}.
 *
 * @remarks
 * This type is the return value of the validatePassword function.  
 * It contains:
 *
 * - **`isValid`** – `true` only when every rule in the evaluated
 *   {@link PasswordPolicy.passwordSecurityInfo | passwordSecurityInfo}
 *   is satisfied.
 * - **`results`** – an array of {@link PasswordComplexityRule} objects,
 *   where each rule’s `status` field has been updated to reflect the
 *   computed result (`"valid"` or `"error"`).  
 *   Use these statuses to display per-rule feedback (for example,
 *   green/red checklist items in a signup form).
 *
 * @example
 * ```ts
 * import { validatePassword } from '../utils/validate-password';
 *
 * const policy: PasswordPolicy = {
 *   policy: 'good',
 *   minLength: 12,
 *   passwordSecurityInfo: [
 *     { code: 'password-policy-length-at-least', label: 'At least 12 characters', status: 'error', args: { count: 12 } },
 *     { code: 'password-policy-lower-case',       label: 'Lowercase letters (a–z)', status: 'error' },
 *     { code: 'password-policy-upper-case',       label: 'Uppercase letters (A–Z)', status: 'error' },
 *   ]
 * };
 *
 * const result = validatePassword('SecretPass123', policy);
 *
 * console.log(result.isValid);
 * // => true if all rules are satisfied
 *
 * console.log(result.results);
 * // => [
 * //      { code: 'password-policy-length-at-least', label: 'At least 12 characters', status: 'valid', ... },
 * //      { code: 'password-policy-lower-case', label: 'Lowercase letters (a–z)', status: 'valid', ... },
 * //      { code: 'password-policy-upper-case', label: 'Uppercase letters (A–Z)', status: 'valid', ... }
 * //    ]
 * ```
 *
 * @public
 */
export interface PasswordValidationResult {
  /**
   * Overall outcome of all password policy checks.
   *
   * `true` only if every rule in {@link results} has `status` equal to `"valid"`.
   */
  isValid: boolean;

  /**
   * Array of evaluated password rules.
   *
   * Each item is a {@link PasswordComplexityRule} whose
   * {@link PasswordComplexityRule.status | status} field reflects the
   * computed validation result for that rule.
   */
  results: PasswordComplexityRule[];
}
