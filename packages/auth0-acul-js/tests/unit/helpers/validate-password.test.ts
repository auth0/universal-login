import { validatePassword } from '../../../src/utils/validate-password';
import type { PasswordPolicy, PasswordComplexityRule } from '../../../interfaces/models/transaction';

describe('validatePassword', () => {
  it('returns empty results when no policy and password provided', () => {
    const result = validatePassword('secret');
    expect(result.isValid).toBe(true);
    expect(result.results).toEqual([]);
  });

  it('returns no_password when no policy and empty password', () => {
    const result = validatePassword('');
    expect(result.isValid).toBe(false);
    expect(result.results).toEqual([
      { code: 'no_password', label: 'Password is required.', status: 'error', isValid: false }
    ]);
  });

  it('handles policy.policy = "none"', () => {
    const policy: PasswordPolicy = { policy: 'none', minLength: 8 };
    const result = validatePassword('', policy);
    expect(result.isValid).toBe(false);
    expect(result.results[0]).toMatchObject({ code: 'no_password' });
  });

  it('handles low policy with only minLength check', () => {
    const policy: PasswordPolicy = { policy: 'low', minLength: 10 };
    const pass = validatePassword('abcdefghij', policy);
    expect(pass.isValid).toBe(true);

    const fail = validatePassword('short', policy);
    expect(fail.isValid).toBe(false);
    expect(fail.results[0]).toMatchObject({
      code: 'password-policy-not-conformant',
      status: 'error'
    });
  });

  it('validates password length rule', () => {
    const rules: PasswordComplexityRule[] = [
      { code: 'password-policy-length-at-least', label: 'At least 12 chars', status: 'valid', isValid: true, args: { count: 12 } }
    ];
    const policy: PasswordPolicy = { policy: 'excellent', minLength: 12, passwordSecurityInfo: rules };

    const tooShort = validatePassword('short', policy);
    expect(tooShort.isValid).toBe(false);
    expect(tooShort.results[0]).toMatchObject({ code: 'password-policy-length-at-least', status: 'error' });

    const longEnough = validatePassword('thisisaverylongpassword', policy);
    expect(longEnough.isValid).toBe(true);
    expect(longEnough.results[0]).toMatchObject({ status: 'valid' });
  });

  it('validates lower/upper/number/special char rules directly', () => {
    const rules: PasswordComplexityRule[] = [
      { code: 'password-policy-lower-case', label: 'lower', status: 'valid', isValid: true },
      { code: 'password-policy-upper-case', label: 'upper', status: 'valid', isValid: true },
      { code: 'password-policy-numbers', label: 'number', status: 'valid', isValid: true },
      { code: 'password-policy-special-characters', label: 'special', status: 'valid', isValid: true },
    ];
    const policy: PasswordPolicy = { policy: 'excellent', passwordSecurityInfo: rules };

    const validPwd = validatePassword('Abc123!', policy);
    expect(validPwd.isValid).toBe(true);

    const invalidPwd = validatePassword('abc', policy);
    const resultMap = Object.fromEntries(invalidPwd.results.map(r => [r.code, r.status]));
    expect(resultMap['password-policy-lower-case']).toBe('valid');
    expect(resultMap['password-policy-upper-case']).toBe('error');
    expect(resultMap['password-policy-numbers']).toBe('error');
    expect(resultMap['password-policy-special-characters']).toBe('error');
    expect(invalidPwd.isValid).toBe(false);
  });

  it('validates password-policy-identical-chars rule', () => {
    const rules: PasswordComplexityRule[] = [
      { code: 'password-policy-identical-chars', label: 'No triple identical', status: 'valid', isValid: true }
    ];
    const policy: PasswordPolicy = { policy: 'excellent', passwordSecurityInfo: rules };

    expect(validatePassword('abc', policy).isValid).toBe(true);
    expect(validatePassword('aaab', policy).isValid).toBe(false);
  });

  it('validates password-policy-contains-at-least with nested items', () => {
    const rules: PasswordComplexityRule[] = [
      {
        code: 'password-policy-contains-at-least',
        label: 'At least 3 of',
        status: 'valid',
        isValid: true,
        args: { count: 3 },
        items: [
          { code: 'password-policy-lower-case', label: 'lower', status: 'valid', isValid: true },
          { code: 'password-policy-upper-case', label: 'upper', status: 'valid', isValid: true },
          { code: 'password-policy-numbers', label: 'number', status: 'valid', isValid: true },
          { code: 'password-policy-special-characters', label: 'special', status: 'valid', isValid: true },
        ]
      }
    ];
    const policy: PasswordPolicy = { policy: 'good', passwordSecurityInfo: rules };

    const ok = validatePassword('Abc@123', policy);
    expect(ok.isValid).toBe(true);
    expect(ok.results.find(r => r.code === 'password-policy-contains-at-least')?.status).toBe('valid');

    const fail = validatePassword('abc', policy);
    expect(fail.isValid).toBe(false);
    expect(fail.results.find(r => r.code === 'password-policy-contains-at-least')?.status).toBe('error');
  });

  it('marks unknown rules as valid', () => {
    const rules: PasswordComplexityRule[] = [
      { code: 'unknown-rule', label: 'Unknown rule', status: 'valid', isValid: true }
    ];
    const policy: PasswordPolicy = { policy: 'fair', passwordSecurityInfo: rules };

    const result = validatePassword('abc', policy);
    expect(result.isValid).toBe(true);
    expect(result.results[0]).toMatchObject({ code: 'unknown-rule', status: 'valid' });
  });

  it('computes overall isValid as the logical AND of all rules', () => {
    const rules: PasswordComplexityRule[] = [
      { code: 'password-policy-lower-case', label: 'lower', status: 'valid', isValid: true },
      { code: 'password-policy-upper-case', label: 'upper', status: 'valid', isValid: true }
    ];
    const policy: PasswordPolicy = { policy: 'excellent', passwordSecurityInfo: rules };

    const onlyLower = validatePassword('loweronly', policy);
    expect(onlyLower.isValid).toBe(false);

    const bothCases = validatePassword('LowerUP', policy);
    expect(bothCases.isValid).toBe(true);
  });
});
