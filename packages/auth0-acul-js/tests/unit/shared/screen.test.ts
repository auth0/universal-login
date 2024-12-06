import {
  getSignupLink,
  getBackLink,
  getLoginLink,
  getResetPasswordLink,
  getForgotPasswordLink,
  getEditIdentifierLink,
  getPublicKey
} from '../../../src/shared/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';

describe(':: overrides | transaction context functions', () => {
  let transaction: TransactionContext;
  let screen: ScreenContext;

  beforeEach(() => {
    // Setting up a basic transaction context with connection options
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
            passkey: { enabled: true }
          }
        }
      }
    } as TransactionContext;

    // Setting up screen context with links and passkey data
    screen = {
      name: 'login',
      links: {
        signup: 'https://example.com/signup',
        back: 'https://example.com/back',
        login: 'https://example.com/login',
        reset_password: 'https://example.com/reset-password',
        forgot_password: 'https://example.com/forgot-password',
        edit_identifier: 'https://example.com/edit-identifier'
      },
      data: {
        passkey: {
          public_key: {
            challenge: 'some-challenge'
          }
        }
      }
    } as ScreenContext;
  });

  it('should return the correct signup link', () => {
    expect(getSignupLink(screen)).toBe('https://example.com/signup');
  });

  it('should return the correct back link', () => {
    expect(getBackLink(screen)).toBe('https://example.com/back');
  });

  it('should return the correct login link', () => {
    expect(getLoginLink(screen)).toBe('https://example.com/login');
  });

  it('should return the correct reset password link', () => {
    expect(getResetPasswordLink(screen)).toBe('https://example.com/reset-password');
  });

  it('should return the correct forgot password link', () => {
    expect(getForgotPasswordLink(screen)).toBe('https://example.com/forgot-password');
  });

  it('should return the correct edit identifier link', () => {
    expect(getEditIdentifierLink(screen)).toBe('https://example.com/edit-identifier');
  });

  it('should return the correct passkey public key', () => {
    const publicKey = getPublicKey(screen);
    expect(publicKey).toBeDefined();
    expect(publicKey?.challenge).toBe('some-challenge');
  });
});

describe(':: overrides | when missing links or passkey', () => {
  let screenWithNoLinks: ScreenContext;
  let screenWithNoPasskey: ScreenContext;

  beforeEach(() => {
    screenWithNoLinks = {
      name: 'login'
    } as ScreenContext;

    screenWithNoPasskey = {
      name: 'login',
      data: {}
    } as ScreenContext;
  });

  it('should return null if signup link is missing', () => {
    expect(getSignupLink(screenWithNoLinks)).toBeNull();
  });

  it('should return null if forgot password link is missing', () => {
    expect(getForgotPasswordLink(screenWithNoLinks)).toBeNull();
  });

  it('should return null if passkey public key is missing', () => {
    expect(getPublicKey(screenWithNoPasskey)).toBeNull();
  });
});
