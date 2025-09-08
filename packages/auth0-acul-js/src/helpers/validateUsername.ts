import type { UsernameValidationError, UsernameValidationResult } from '../../interfaces/models/screen';
import type { UsernamePolicy } from '../../interfaces/models/transaction';

type AllowedFormats = {
  usernameInEmailFormat?: boolean;
  usernameInPhoneFormat?: boolean;
};

export function validateUsername(
  username: string,
  policy?: UsernamePolicy | null
): UsernameValidationResult {
  const errors: UsernameValidationError[] = [];

  if (!policy) {
    return {
      isValid: username.trim().length > 0,
      errors: username.trim().length > 0
        ? []
        : [{ code: 'username-required', message: 'Username is required.' }],
    };
  }

  const {
    minLength = 1,
    maxLength = 30,
    allowedFormats: userAllowedFormats = {} as AllowedFormats,
  } = policy;

  const allowedFormats = {
    usernameInEmailFormat:
      userAllowedFormats.usernameInEmailFormat !== undefined
        ? userAllowedFormats.usernameInEmailFormat
        : true,
    usernameInPhoneFormat:
      userAllowedFormats.usernameInPhoneFormat !== undefined
        ? userAllowedFormats.usernameInPhoneFormat
        : true,
  };

  // 1. Check minimum length
  if (username.length < minLength) {
    errors.push({
      code: 'username-too-short',
      message: `Username must be at least ${minLength} characters long.`,
    });
  }

  // 2. Check maximum length
  if (username.length > maxLength) {
    errors.push({
      code: 'username-too-long',
      message: `Username must be no more than ${maxLength} characters.`,
    });
  }

  // 3. Disallow email format if not allowed
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  if (!allowedFormats.usernameInEmailFormat && isEmail) {
    errors.push({
      code: 'username-email-not-allowed',
      message: 'Usernames in email format are not allowed.',
    });
  }

  // 4. Disallow phone format if not allowed
  const normalizedUsername = username.replace(/\s+/g, '');
  const isPhone = /^\+?\d{7,15}$/.test(normalizedUsername);
  if (!allowedFormats.usernameInPhoneFormat && isPhone) {
    errors.push({
      code: 'username-phone-not-allowed',
      message: 'Usernames in phone number format are not allowed.',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default validateUsername;
