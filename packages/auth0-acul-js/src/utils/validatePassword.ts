import type { PasswordRuleValidation } from '../../interfaces/models/screen';
import type { PasswordPolicy, PasswordComplexityRule } from '../../interfaces/models/transaction';

/**
 * Validates a password string against a given password policy.
 *
 * This function checks whether the provided password meets specific
 * password policy requirements such as:
 * - Minimum length
 * - Character complexity (lowercase, uppercase, numbers, special characters)
 * - Identical consecutive characters
 * - A minimum number of passed complexity rules (e.g. "at least 3 of the following")
 *
 * It returns a list of validation results for each policy rule, where each result
 * includes the rule code, message (label), and a boolean indicating whether it passed.
 *
 * @param {string} password - The password string to validate.
 * @param {PasswordPolicy | null | undefined} policy - The password policy to validate against.
 *        If not provided, the password is only checked for being non-empty.
 *
 * @returns {PasswordRuleValidation[]} An array of rule validation results.
 *          Each result contains:
 *          - `code`: string (the rule identifier)
 *          - `policy`: string (the user-friendly rule description)
 *          - `isValid`: boolean (true if the password satisfies the rule)
 *
 * @example
 * const policy = {
 *   minLength: 12,
 *   passwordSecurityInfo: [
 *     { code: 'password-policy-length-at-least', label: 'At least 12 characters', args: { count: 12 } },
 *     { code: 'password-policy-contains-at-least', label: 'At least 3 of the following:', args: { count: 3 }, items: [
 *       { code: 'password-policy-lower-case', label: 'Lowercase letters (a-z)' },
 *       { code: 'password-policy-upper-case', label: 'Uppercase letters (A-Z)' },
 *       { code: 'password-policy-numbers', label: 'Numbers (0-9)' },
 *       { code: 'password-policy-special-characters', label: 'Special characters (!@#$%^&*)' }
 *     ]},
 *     { code: 'password-policy-identical-chars', label: 'No more than 2 identical characters in a row' }
 *   ]
 * };
 *
 * const result = validatePassword('P@ssword123', policy);
 * console.log(result);
 * // [
 * //   { code: 'password-policy-length-at-least', policy: 'At least 12 characters', isValid: true },
 * //   { code: 'password-policy-contains-at-least', policy: 'At least 3 of the following:', isValid: true },
 * //   { code: 'password-policy-lower-case', policy: 'Lowercase letters (a-z)', isValid: true },
 * //   { code: 'password-policy-upper-case', policy: 'Uppercase letters (A-Z)', isValid: true },
 * //   { code: 'password-policy-numbers', policy: 'Numbers (0-9)', isValid: true },
 * //   { code: 'password-policy-special-characters', policy: 'Special characters (!@#$%^&*)', isValid: true },
 * //   { code: 'password-policy-identical-chars', policy: 'No more than 2 identical characters in a row', isValid: true }
 * // ]
 */

function validatePassword(
  password: string,
  policy?: PasswordPolicy | null
): PasswordRuleValidation[] {
  const results: PasswordRuleValidation[] = [];

  if (!policy) {
    return password
      ? []
      : [{
          code: 'password_required',
          policy: 'Password is required.',
          isValid: false
        }];
  }

  const minLength = policy.minLength ?? 8;

  // Base checks
  const lower = /[a-z]/.test(password);
  const upper = /[A-Z]/.test(password);
  const number = /\d/.test(password);
  const special = /[\W_]/.test(password);
  const identicalChars = /(.)\1\1/.test(password); // 3+ identical chars in a row

  // Map for complexity checks
  const complexityMap: Record<string, boolean> = {
    'password-policy-lower-case': lower,
    'password-policy-upper-case': upper,
    'password-policy-numbers': number,
    'password-policy-special-characters': special,
  };

  const passedComplexityChecks = Object.values(complexityMap).filter(Boolean).length;

  const securityInfo = (policy.passwordSecurityInfo ?? []) as PasswordComplexityRule[];

  for (const rule of securityInfo) {
    switch (rule.code) {
      case 'password-policy-length-at-least': {
        const required = rule.args?.count ?? minLength;
        const valid = password.length >= required;
        results.push({
          code: rule.code,
          policy: rule.label,
          isValid: valid,
        });
        break;
      }

      case 'password-policy-lower-case':
      case 'password-policy-upper-case':
      case 'password-policy-numbers':
      case 'password-policy-special-characters': {
        const valid = complexityMap[rule.code] ?? true;
        results.push({
          code: rule.code,
          policy: rule.label,
          isValid: valid,
        });
        break;
      }

      case 'password-policy-identical-chars': {
        results.push({
          code: rule.code,
          policy: rule.label,
          isValid: !identicalChars,
        });
        break;
      }

      case 'password-policy-contains-at-least': {
        const requiredCount = rule.args?.count ?? 3;
        const isMainRuleValid = passedComplexityChecks >= requiredCount;

        results.push({
          code: rule.code,
          policy: rule.label,
          isValid: isMainRuleValid,
        });

        // Also evaluate nested complexity rules (like lower-case, numbers, etc.)
        if (rule.items) {
          for (const item of rule.items) {
            const passed = complexityMap[item.code] ?? true;
            results.push({
              code: item.code,
              policy: item.label,
              isValid: passed,
            });
          }
        }
        break;
      }

      default: {
        // Optional: if unknown rule, assume valid
        results.push({
          code: rule.code,
          policy: rule.label,
          isValid: true,
        });
        break;
      }
    }
  }

  return results;
}

export default validatePassword;
