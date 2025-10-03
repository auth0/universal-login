import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaPhoneChallengeScreen from '../../src/screens/reset-password-mfa-phone-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-phone-challenge', () => {
  return jest.fn().mockImplementation(() => ({
    // Mock methods will be defined per test
  }));
}, { virtual: true });

// Mock the instance store
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn((Screen) => new Screen()),
}));

// Mock error manager and hooks
jest.mock('../../src/hooks', () => ({
  errorManager: {
    withError: jest.fn((promise) => promise),
  },
  ContextHooks: jest.fn().mockImplementation(() => ({
    useUser: jest.fn(),
    useTenant: jest.fn(),
    useBranding: jest.fn(),
    useClient: jest.fn(),
    useOrganization: jest.fn(),
    usePrompt: jest.fn(),
    useScreen: jest.fn(),
    useTransaction: jest.fn(),
    useUntrustedData: jest.fn(),
  })),
  useCurrentScreen: jest.fn(),
  useErrors: jest.fn(),
  useAuth0Themes: jest.fn(),
}));

describe('ResetPasswordMfaPhoneChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaPhoneChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaPhoneChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaPhoneChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
