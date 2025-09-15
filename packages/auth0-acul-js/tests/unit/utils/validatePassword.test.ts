import validatePassword from '../../../src/utils/validatePassword';
import type { PasswordComplexityRule, PasswordPolicy } from '../../../interfaces/models/transaction';
import type { PasswordRuleValidation } from '../../../interfaces/models/screen';

// Helper to get all failed rule codes
const getFailedRules = (result: PasswordRuleValidation[]) =>
  result.filter((r) => !r.isValid).map((r) => r.code);

// Local test-only version of PasswordPolicy
type TestPasswordPolicy = {
  policy: 'low' | 'fair' | 'good' | 'excellent';
  minLength: number;
  passwordSecurityInfo?: PasswordComplexityRule[];
};

describe('validatePassword', () => {
  const baseSecurityInfo: PasswordComplexityRule[] = [
    {
      code: 'password-policy-length-at-least',
      label: 'Min length not met',
      args: { count: 8 },
      status: 'valid',
    },
    {
      code: 'password-policy-lower-case',
      label: 'Missing lowercase',
      status: 'valid',
    },
    {
      code: 'password-policy-upper-case',
      label: 'Missing uppercase',
      status: 'valid',
    },
    {
      code: 'password-policy-numbers',
      label: 'Missing number',
      status: 'valid',
    },
    {
      code: 'password-policy-special-characters',
      label: 'Missing special char',
      status: 'valid',
    },
    {
      code: 'password-policy-identical-chars',
      label: 'Has identical chars',
      args: { count: 3 },
      status: 'valid',
    },
    {
      code: 'password-policy-contains-at-least',
      label: 'At least 3 of the following',
      args: { count: 3 },
      status: 'valid',
      items: [
        {
          code: 'password-policy-lower-case',
          label: 'Lower case letters (a-z)',
          status: 'valid',
        },
        {
          code: 'password-policy-upper-case',
          label: 'Upper case letters (A-Z)',
          status: 'valid',
        },
        {
          code: 'password-policy-numbers',
          label: 'Numbers (0-9)',
          status: 'valid',
        },
        {
          code: 'password-policy-special-characters',
          label: 'Special characters',
          status: 'valid',
        },
      ],
    },
  ];

  const policies: Record<string, TestPasswordPolicy> = {
    low: {
      policy: 'low',
      minLength: 6,
      passwordSecurityInfo: baseSecurityInfo,
    },
    fair: {
      policy: 'fair',
      minLength: 8,
      passwordSecurityInfo: baseSecurityInfo,
    },
    good: {
      policy: 'good',
      minLength: 10,
      passwordSecurityInfo: baseSecurityInfo,
    },
    excellent: {
      policy: 'excellent',
      minLength: 12,
      passwordSecurityInfo: baseSecurityInfo,
    },
  };

  it('returns error when password is empty and no policy', () => {
    const result = validatePassword('', null);
    const failed = getFailedRules(result);
    expect(failed).toContain('password_required');
  });

  it('returns no errors when password present and no policy', () => {
    const result = validatePassword('anyPassword123!', null);
    const failed = getFailedRules(result);
    expect(failed.length).toBe(0);
  });

  it('fails minLength rule', () => {
    const password = 'short';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-length-at-least');
  });

  it('fails missing lowercase rule', () => {
    const password = 'PASSWORD1!';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-lower-case');
  });

  it('fails missing uppercase rule', () => {
    const password = 'password1!';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-upper-case');
  });

  it('fails missing number rule', () => {
    const password = 'Password!';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-numbers');
  });

  it('fails missing special character rule', () => {
    const password = 'Password1';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-special-characters');
  });

  it('fails identical chars rule when 3 identical in a row', () => {
    const password = 'Passsssword1!';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-identical-chars');
  });

  it('fails "contains at least" rule when not enough complexity types met', () => {
    const password = 'PasswordPassword';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-contains-at-least');
  });

  it('fails nested items in "contains at least" when individual complexity rules fail', () => {
    const password = 'PasswordPassword';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed).toContain('password-policy-numbers');
    expect(failed).toContain('password-policy-special-characters');
  });

  it('passes all rules with a strong password for fair policy', () => {
    const password = 'Strong1!';
    const policy = policies.fair as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed.length).toBe(0);
  });

  it('passes all rules with a very strong password for excellent policy', () => {
    const password = 'Excellent1@Password';
    const policy = policies.excellent as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed.length).toBe(0);
  });

  it('passes good policy with all complexity rules', () => {
    const password = 'GoodPass1!';
    const policy = policies.good as unknown as PasswordPolicy;
    const result = validatePassword(password, policy);
    const failed = getFailedRules(result);
    expect(failed.length).toBe(0);
  });
});
