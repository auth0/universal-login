import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaOtpChallengeScreen from '../../src/screens/reset-password-mfa-otp-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-otp-challenge', () => {
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

describe('ResetPasswordMfaOtpChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaOtpChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaOtpChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaOtpChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
