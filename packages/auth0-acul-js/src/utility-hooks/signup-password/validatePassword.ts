import signupPasswordInstance from '../../screens/signup-password';
import coreValidatePassword from '../validatePassword';

import type { PasswordValidationResult } from '../validatePassword';

export function validatePasswordforSignupPassword(password: string): PasswordValidationResult {
  const context = new signupPasswordInstance();
  const passwordPolicy = context.transaction?.passwordPolicy;
  return coreValidatePassword(password, passwordPolicy);
}
