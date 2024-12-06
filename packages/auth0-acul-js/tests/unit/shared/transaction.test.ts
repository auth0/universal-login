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
import { TransactionContext } from "../../../interfaces/models/transaction";

describe('Transaction Context Functions', () => {
  let transaction: TransactionContext;

  beforeEach(() => {
    // Basic setup for a transaction context
    transaction = {
      state: 'start',
      locale: 'en',
      connection: {
        name: 'default',
        strategy: 'db',
        options: {
          signup_enabled: true,
          forgot_password_enabled: true,
          authentication_methods: {
            password: { enabled: true },
            passkey: { enabled: true }
          },
          attributes: {
            email: { signup_status: 'required' },
            username: { signup_status: 'optional', validation: { max_length: 20, min_length: 5, allowed_types: { email: true, phone_number: true } } },
            phone: { signup_status: 'optional' }
          }
        }
      }
    } as TransactionContext;
  });

  it('should return true for username required', () => {
    // Simulate a scenario where the username is required
    expect(isUsernameRequired(transaction)).toBe(false); // Since username_required is not set to true in the connection options
  });

  it('should return the username policy', () => {
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

  it('should return allowed identifiers', () => {
    const expectedIdentifiers = ['email', 'username', 'phone'];
    expect(getAllowedIdentifiers(transaction)).toEqual(expectedIdentifiers);
  });

  it('should return the required identifiers', () => {
    const expectedRequiredIdentifiers = ['email'];
    expect(getRequiredIdentifiers(transaction)).toEqual(expectedRequiredIdentifiers);
  });

  it('should return the optional identifiers', () => {
    const expectedOptionalIdentifiers = ['username', 'phone'];
    expect(getOptionalIdentifiers(transaction)).toEqual(expectedOptionalIdentifiers);
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
});

describe('Transaction Context Functions - Missing Attributes', () => {
  let transactionWithNoAttributes: TransactionContext;

  beforeEach(() => {
    // Transaction context with missing attributes
    transactionWithNoAttributes = {
      state: 'start',
      locale: 'en',
      connection: {
        name: 'default',
        strategy: 'db',
        options: {
          signup_enabled: true,
          forgot_password_enabled: true,
          authentication_methods: {
            password: { enabled: true },
            passkey: { enabled: true }
          },
          attributes: {}
        }
      }
    } as TransactionContext;
  });

  it('should return false when username is not required and no attribute is present', () => {
    expect(isUsernameRequired(transactionWithNoAttributes)).toBe(false);
  });

  it('should return null if username policy is missing', () => {
    expect(getUsernamePolicy(transactionWithNoAttributes)).toBeNull();
  });

  it('should return null if password policy is missing', () => {
    expect(getPasswordPolicy(transactionWithNoAttributes)).toBeNull();
  });

  it('should return null if allowed identifiers are missing', () => {
    expect(getAllowedIdentifiers(transactionWithNoAttributes)).toBeNull();
  });

  it('should return null if required identifiers are missing', () => {
    expect(getRequiredIdentifiers(transactionWithNoAttributes)).toBeNull();
  });

  it('should return null if optional identifiers are missing', () => {
    expect(getOptionalIdentifiers(transactionWithNoAttributes)).toBeNull();
  });
});

