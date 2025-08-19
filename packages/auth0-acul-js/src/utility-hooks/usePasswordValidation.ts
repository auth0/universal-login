import type { PasswordPolicy, Error, PasswordComplexityRule } from '../../interfaces/models/transaction';

type PasswordValidationResult = {
  isValid: boolean;
  errors: Error[];
};

function validatePassword(
  password: string,
  policy?: PasswordPolicy | null
): PasswordValidationResult {
  const errors: Error[] = [];

  if (!policy) {
    if (!password || typeof password !== 'string') {
      errors.push({ code: 'password_required', message: 'Password is required.' });
      return { isValid: false, errors };
    }
    return { isValid: true, errors };
  }

  const minLength = policy.minLength ?? 8;

  const lower = /[a-z]/.test(password);
  const upper = /[A-Z]/.test(password);
  const number = /\d/.test(password);
  const special = /[\W_]/.test(password);
  const identicalChars = /(.)\1\1/.test(password); // 3+ identical chars in a row
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
      case 'password-policy-length-at-least':
        if (password.length < (rule.args?.count ?? minLength)) {
          errors.push({ code: rule.code, message: rule.label });
        }
        break;

      case 'password-policy-lower-case':
      case 'password-policy-upper-case':
      case 'password-policy-numbers':
      case 'password-policy-special-characters':
        if (!complexityMap[rule.code]) {
          errors.push({ code: rule.code, message: rule.label });
        }
        break;

      case 'password-policy-identical-chars':
        if (identicalChars) {
          errors.push({ code: rule.code, message: rule.label });
        }
        break;

      case 'password-policy-contains-at-least': {
        const requiredCount = rule.args?.count ?? 3;
        if (passedComplexityChecks < requiredCount) {
          errors.push({ code: rule.code, message: rule.label });
        }

        // Check nested items and push individual failed items too
        if (rule.items) {
          for (const item of rule.items) {
            const passed = complexityMap[item.code] ?? true;
            if (!passed) {
              errors.push({ code: item.code, message: item.label });
            }
          }
        }
        break;
      }

      default:
        break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default validatePassword;
