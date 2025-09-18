import {
  USERNAME_ERROR_CODES,
  USERNAME_ERROR_MESSAGES,
} from '../constants/errors';
import { Fields } from '../constants/identifiers';

import type { UsernamePolicy } from '../../interfaces/models/transaction';
import type {
  UsernameValidationError,
  UsernameValidationResult,
} from '../../interfaces/utils/validate-username';

type AllowedFormats = {
  usernameInEmailFormat?: boolean;
  usernameInPhoneFormat?: boolean;
};

const field = Fields.USERNAME;

/**
 * Validates a username string against a given username policy.
 *
 * This function checks the username for:
 * - Presence (if no policy is provided)
 * - Minimum and maximum length
 * - Email format restrictions
 * - Phone number format restrictions
 *
 * If no policy is provided, it defaults to checking whether the username is non-empty.
 *
 * @param {string} username - The username to validate.
 * @param {UsernamePolicy | null} [policy] - Optional validation policy defining length limits and allowed formats.
 *
 * @returns {UsernameValidationResult} An object containing:
 *  - `isValid`: A boolean indicating if the username passed all validations.
 *  - `errors`: An array of validation errors, if any.
 */
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
        : [
            {
              code: USERNAME_ERROR_CODES.REQUIRED,
              message: USERNAME_ERROR_MESSAGES.REQUIRED,
              field
            },
          ],
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
      code: USERNAME_ERROR_CODES.TOO_SHORT,
      message: USERNAME_ERROR_MESSAGES.TOO_SHORT(minLength),
      field
    });
  }

  // 2. Check maximum length
  if (username.length > maxLength) {
    errors.push({
      code: USERNAME_ERROR_CODES.TOO_LONG,
      message: USERNAME_ERROR_MESSAGES.TOO_LONG(maxLength),
      field
    });
  }

  // 3. Disallow email format if not allowed
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
  if (!allowedFormats.usernameInEmailFormat && isEmail) {
    errors.push({
      code: USERNAME_ERROR_CODES.EMAIL_NOT_ALLOWED,
      message: USERNAME_ERROR_MESSAGES.EMAIL_NOT_ALLOWED,
      field
    });
  }

  // 4. Disallow phone format if not allowed
  const normalizedUsername = username.replace(/\s+/g, '');
  const isPhone = /^\+?\d{7,15}$/.test(normalizedUsername);
  if (!allowedFormats.usernameInPhoneFormat && isPhone) {
    errors.push({
      code: USERNAME_ERROR_CODES.PHONE_NOT_ALLOWED,
      message: USERNAME_ERROR_MESSAGES.PHONE_NOT_ALLOWED,
      field
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
