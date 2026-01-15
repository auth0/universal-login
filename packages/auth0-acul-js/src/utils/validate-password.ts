import type {
  PasswordPolicy,
  PasswordComplexityRule,
  PasswordComplexityPolicy
} from "../../interfaces/models/transaction";
import type { PasswordValidationResult } from "../../interfaces/utils/validate-password";

const hasSequentialChars = (password: string, maxSeq: number): boolean => {
  if (maxSeq < 2) return false;

  const chars = password.split("").map((c) => c.charCodeAt(0));

  let inc = 1;
  let dec = 1;

  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1] + 1) {
      inc++;
      dec = 1;
    } else if (chars[i] === chars[i - 1] - 1) {
      dec++;
      inc = 1;
    } else {
      inc = dec = 1;
    }

    if (inc >= maxSeq || dec >= maxSeq) return true;
  }

  return false;
};

const hasIdenticalChars = (password: string, count = 3): boolean =>
  new RegExp(`(.)\\1{${count - 1},}`).test(password);

/**
 * Validates a password against a complexity policy and returns
 * rule-level validation results.
 *
 * @param password The password to validate
 * @param policy The complexity policy to apply
 * @returns Validation result indicating overall and per-rule validity
 */
export function validateWithComplexityPolicy(
  password: string,
  policy: PasswordComplexityPolicy
): PasswordValidationResult {
  const results: PasswordComplexityRule[] = [];

  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  // Min length
  results.push({
    code: "password-policy-min-length",
    label: `Password must be at least ${policy.min_length} characters long.`,
    status: password.length >= policy.min_length ? "valid" : "error",
    isValid: password.length >= policy.min_length,
  });


  const MIN_SEQUENCE_LENGTH = 2;

  // Identical characters
  if (policy.identical_characters === "block") {
    const isValid = !hasIdenticalChars(password, MIN_SEQUENCE_LENGTH);

    results.push({
      code: "password-policy-identical-chars",
      label: "Password must not contain repeated characters.",
      status: isValid ? "valid" : "error",
      isValid,
    });
  }

  if (policy.sequential_characters === "block") {
    const isValid = !hasSequentialChars(password, MIN_SEQUENCE_LENGTH);

    results.push({
      code: "password-policy-sequential-chars",
      label: "Password must not contain sequential characters.",
      status: isValid ? "valid" : "error",
      isValid,
    });
  }


  // Character type rules
 const typeResults: PasswordComplexityRule[] =
  policy.character_types.map((type) => {
    const isValid = checks[type];
    return {
      code: `password-policy-${type}`,
      label: `Password must contain at least one ${type} character.`,
      status: isValid ? "valid" : "error",
      isValid,
    };
  });

  results.push(...typeResults);

  // character_type_rule = "all"
  if (policy.character_type_rule === "all") {
    const allValid = typeResults.every((r) => r.isValid);
    results.push({
      code: "password-policy-character-types",
      label: "Password must contain all required character types.",
      status: allValid ? "valid" : "error",
      isValid: allValid,
      items: typeResults,
    });
  }

  return {
    isValid: results.every((r) => r.status === "valid"),
    results,
  };
}


/**
 * Validate a password string against an Auth0 password policy.
 *
 * @param password - The password to validate.
 * @param policy   - Optional password policy. If omitted or `none`, only checks for non-empty password.
 * @returns        - `isValid` overall and per-rule `results` where each rule's `status`
 *                   is updated to `'valid'` or `'error'`. For 'contains-at-least', child
 *                   item statuses are updated in-place and the parent is `valid` only if
 *                   **all** child items are `valid`.
 */
export function validatePassword(
  password: string,
  policy?: PasswordPolicy | null
): PasswordValidationResult {
  // If password policy is none or missing, only require a non-empty password.
  if (!policy || policy.policy === "none") {
    const results: PasswordComplexityRule[] = password.length
      ? []
      : [
          {
            code: "no_password",
            label: "Password is required.",
            status: "error",
            isValid: false,
          },
        ];
    return { isValid: results.length === 0, results };
  }

  // If policy is 'low' and no rules provided, only check minimum length.
  const minLength = policy.minLength ?? 8;
  const rules: PasswordComplexityRule[] = Array.isArray(
    policy.passwordSecurityInfo
  )
    ? policy.passwordSecurityInfo
    : [];

  if (policy.policy === "low" && rules.length === 0) {
    const status = password.length >= minLength ? "valid" : "error";
    const isValid = status === "valid";
    const results: PasswordComplexityRule[] = [
      {
        code: "password-policy-not-conformant",
        label: `Password must be at least ${minLength} characters long.`,
        status,
        isValid,
      },
    ];
    return { isValid: results.every((r) => r.status === "valid"), results };
  }

  const results: PasswordComplexityRule[] = [];

  // Pre-compute checks
  const checks = {
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
    hasTripleIdentical: /(.)\1\1/.test(password),
  };

  const complexityMap: Record<string, boolean> = {
    "password-policy-lower-case": checks.lower,
    "password-policy-upper-case": checks.upper,
    "password-policy-numbers": checks.number,
    "password-policy-special-characters": checks.special,
  };

  const passedComplexityCount =
    Object.values(complexityMap).filter(Boolean).length;

  const pushWithStatus = (
    rule: PasswordComplexityRule,
    isValid: boolean
  ): void => {
    results.push({
      ...rule,
      status: isValid ? "valid" : "error",
      isValid,
    });
  };

  for (const rule of rules) {
    const { code, args, items } = rule;

    switch (code) {
      case "password-policy-length-at-least": {
        const required =
          typeof args?.count === "number" ? args.count : minLength;
        pushWithStatus(rule, password.length >= required);
        break;
      }

      case "password-policy-identical-chars": {
        const isValid = password.length > 0 && !checks.hasTripleIdentical;
        pushWithStatus(rule, isValid);
        break;
      }

      case "password-policy-contains-at-least": {
        // Auth0 requires at least 3 of the child rules to pass. Hardcoding as of now.
        const childRulesCount = Array.isArray(items) ? items.length : 0;
        const requiredPassCount = 3;
        const requiredCount =
          childRulesCount >= requiredPassCount
            ? requiredPassCount
            : childRulesCount;

        if (items && childRulesCount > 0) {
          // Update child item statuses in-place on the object we push.
          const updatedItems: PasswordComplexityRule[] = items.map((item) => ({
            ...item,
            status: complexityMap[item.code] ? "valid" : "error",
            isValid: !!complexityMap[item.code],
          }));

          // Parent is valid only if at least `requiredCount` of these child items are valid.
          const passed = updatedItems.filter(
            (i) => i.status === "valid"
          ).length;
          const isValid = passed >= requiredCount;

          results.push({
            ...rule,
            items: updatedItems,
            status: isValid ? "valid" : "error",
            isValid,
          });
        } else {
          // No items: fall back to the 'at least N' check using aggregate complexity.
          const isValid = passedComplexityCount >= requiredCount;
          pushWithStatus(rule, isValid);
        }
        break;
      }

      case "password-policy-lower-case":
      case "password-policy-upper-case":
      case "password-policy-numbers":
      case "password-policy-special-characters": {
        pushWithStatus(rule, !!complexityMap[code]);
        break;
      }

      default: {
        // Treat unknown rules as valid. Let Auth0 handle any unsupported rules.
        pushWithStatus(rule, true);
        break;
      }
    }
  }

  return { isValid: results.every((r) => r.status === "valid"), results };
}
