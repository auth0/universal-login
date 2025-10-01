import { validateUsername } from '../../../src/utils/validate-username';
import type { UsernamePolicy } from '../../../interfaces/models/transaction';

// Helper to extract failed error codes
const getFailedCodes = (result: ReturnType<typeof validateUsername>) =>
  result.errors.map((e) => e.code);

describe('validateUsername', () => {
  const basePolicy: UsernamePolicy = {
    isActive: true,
    minLength: 3,
    maxLength: 15,
    allowedFormats: {
      usernameInEmailFormat: false,
      usernameInPhoneFormat: false,
    },
  };

  it('returns empty errors when username is empty and no policy', () => {
    const result = validateUsername('', null);
    const failed = getFailedCodes(result);
    expect(failed).toEqual([]);
  });

  it('passes validation when username is non-empty and no policy', () => {
    const result = validateUsername('anyuser', null);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('fails when username is shorter than minLength', () => {
    const result = validateUsername('ab', basePolicy);
    const failed = getFailedCodes(result);
    expect(failed).toContain('username-too-short');
  });

  it('fails when username is longer than maxLength', () => {
    const result = validateUsername('averyverylongusername', basePolicy);
    const failed = getFailedCodes(result);
    expect(failed).toContain('username-too-long');
  });

  it('fails when username is in email format and email not allowed', () => {
    const result = validateUsername('test@example.com', basePolicy);
    const failed = getFailedCodes(result);
    expect(failed).toContain('username-email-not-allowed');
  });

  it('fails when username is in phone number format and phone not allowed', () => {
    const result = validateUsername('+1234567890', basePolicy);
    const failed = getFailedCodes(result);
    expect(failed).toContain('username-phone-not-allowed');
  });

  it('passes all rules with valid username', () => {
    const result = validateUsername('validUser123', basePolicy);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('passes with email format if email is allowed', () => {
    const policy = {
      minLength: 1,
      maxLength: 30,
      allowedFormats: {
        usernameInEmailFormat: true,
        usernameInPhoneFormat: false,
      },
    };
    const username = 'test@example.com';
    const result = validateUsername(username, policy);
    expect(result.isValid).toBe(true);
  });

  it('passes with phone number format if phone is allowed', () => {
    const result = validateUsername('+1234567890', {
      ...basePolicy,
      allowedFormats: {
        ...basePolicy.allowedFormats,
        usernameInPhoneFormat: true,
      },
    });
    expect(result.isValid).toBe(true);
  });

  it('fails multiple rules at once', () => {
    const result = validateUsername('a@b.c', {
      isActive: true,
      minLength: 10,
      maxLength: 12,
      allowedFormats: {
        usernameInEmailFormat: false,
        usernameInPhoneFormat: false,
      },
    });
    const failed = getFailedCodes(result);
    expect(failed).toContain('username-too-short');
    expect(failed).toContain('username-email-not-allowed');
  });
});
