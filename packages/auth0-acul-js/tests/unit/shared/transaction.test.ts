import {
  isSignupEnabled,
  isForgotPasswordEnabled,
  isPasskeyEnabled,
  isUsernameRequired,
  getUsernamePolicy,
  getPasswordPolicy,
  getAllowedIdentifiers,
  getRequiredIdentifiers,
  getOptionalIdentifiers
} from "../../../src/shared/transaction";
import type { TransactionContext } from "../../../interfaces/models/transaction";

describe('Transaction Context Functions', () => {
  let transaction: TransactionContext;

  beforeEach(() => {
    transaction = {
      state: 'start',
      locale: 'en',
      country_code: { code: 'US', prefix: '+1' },
      connection: {
        name: 'default',
        strategy: 'auth0',
        options: {
          signup_enabled: true,
          forgot_password_enabled: true,
          username_required: false,
          authentication_methods: {
            password: { enabled: true, policy: 'good', min_length: 8 },
            passkey: { enabled: true }
          },
          attributes: {
            email: { signup_status: 'required', identifier_active: true },
            username: { 
              signup_status: 'optional', 
              identifier_active: true,
              validation: { max_length: 20, min_length: 5, allowed_types: { email: true, phone_number: true } }
            },
            phone: { signup_status: 'optional', identifier_active: true }
          }
        }
      }
    } as TransactionContext;
  });

  it('should return true for signup enabled', () => {
    expect(isSignupEnabled(transaction)).toBe(true);
  });

  it('should return true for forgot password enabled', () => {
    expect(isForgotPasswordEnabled(transaction)).toBe(true);
  });

  it('should return true for passkey enabled', () => {
    expect(isPasskeyEnabled(transaction)).toBe(true);
  });

  it('should return false for username required', () => {
    expect(isUsernameRequired(transaction)).toBe(false);
  });

  it('should return the correct username policy', () => {
    const expectedPolicy = {
      maxLength: 20,
      minLength: 5,
      allowedFormats: {
        usernameInEmailFormat: true,
        usernameInPhoneFormat: true
      }
    };
    expect(getUsernamePolicy(transaction)).toEqual(expectedPolicy);
  });

  it('should return the correct password policy', () => {
    const expectedPolicy = {
      minLength: 8,
      policy: 'good'
    };
    expect(getPasswordPolicy(transaction)).toEqual(expectedPolicy);
  });

  it('should return allowed identifiers', () => {
    const expectedIdentifiers = ['email', 'username', 'phone'];
    expect(getAllowedIdentifiers(transaction)).toEqual(expectedIdentifiers);
  });

  it('should return required identifiers', () => {
    const expectedRequiredIdentifiers = ['email'];
    expect(getRequiredIdentifiers(transaction)).toEqual(expectedRequiredIdentifiers);
  });

  it('should return optional identifiers', () => {
    const expectedOptionalIdentifiers = ['username', 'phone'];
    expect(getOptionalIdentifiers(transaction)).toEqual(expectedOptionalIdentifiers);
  });
});

describe('Transaction Context Functions - Edge Cases', () => {
  let transactionWithMissingFields: TransactionContext;

  beforeEach(() => {
    transactionWithMissingFields = {
      state: 'start',
      locale: 'en',
      connection: {
        name: 'default',
        strategy: 'auth0',
        options: {
          signup_enabled: false,
          forgot_password_enabled: false,
          username_required: undefined,
          authentication_methods: {
            password: undefined,
            passkey: { enabled: false }
          },
          attributes: {}
        }
      }
    } as TransactionContext;
  });

  it('should return false when signup is not enabled', () => {
    expect(isSignupEnabled(transactionWithMissingFields)).toBe(false);
  });

  it('should return false when forgot password is not enabled', () => {
    expect(isForgotPasswordEnabled(transactionWithMissingFields)).toBe(false);
  });

  it('should return false when passkey is not enabled', () => {
    expect(isPasskeyEnabled(transactionWithMissingFields)).toBe(false);
  });

  it('should return false when username requirement is undefined', () => {
    expect(isUsernameRequired(transactionWithMissingFields)).toBe(false);
  });

  it('should return null if username policy is missing', () => {
    expect(getUsernamePolicy(transactionWithMissingFields)).toBeNull();
  });

  it('should return null if password policy is missing', () => {
    expect(getPasswordPolicy(transactionWithMissingFields)).toBeNull();
  });

  it('should return null if allowed identifiers are missing', () => {
    expect(getAllowedIdentifiers(transactionWithMissingFields)).toBeNull();
  });

  it('should return null if required identifiers are missing', () => {
    expect(getRequiredIdentifiers(transactionWithMissingFields)).toBeNull();
  });

  it('should return null if optional identifiers are missing', () => {
    expect(getOptionalIdentifiers(transactionWithMissingFields)).toBeNull();
  });
});

describe('Transaction Context Functions - Passwordless Connection', () => {
  let passwordlessTransaction: TransactionContext;

  beforeEach(() => {
    passwordlessTransaction = {
      state: 'start',
      locale: 'en',
      connection: {
        name: 'passwordless',
        strategy: 'sms',
        options: {
          signup_enabled: true
        }
      }
    } as TransactionContext;
  });

  it('should return true when signup is enabled for passwordless connection', () => {
    expect(isSignupEnabled(passwordlessTransaction)).toBe(true);
  });

  it('should return null for forgot password enabled since it does not exist in passwordless connection', () => {
    expect(isForgotPasswordEnabled(passwordlessTransaction)).toBe(false);
  });

  it('should return null for passkey enabled since it does not exist in passwordless connection', () => {
    expect(isPasskeyEnabled(passwordlessTransaction)).toBe(false);
  });

  it('should return null for username required since it does not exist in passwordless connection', () => {
    expect(isUsernameRequired(passwordlessTransaction)).toBe(false);
  });
});
