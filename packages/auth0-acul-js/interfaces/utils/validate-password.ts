import type { PasswordComplexityRule } from "../../interfaces/models/transaction";
export interface PasswordValidationResult {
  /**
   * Overall outcome of all password policy checks.
   *
   * `true` only if every rule in {@link PasswordComplexityRule} has `status` equal to `"valid"`.
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
