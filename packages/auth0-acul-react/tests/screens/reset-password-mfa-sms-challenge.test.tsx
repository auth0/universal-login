import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaSmsChallengeScreen from '../../src/screens/reset-password-mfa-sms-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-sms-challenge', () => {
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

describe('ResetPasswordMfaSmsChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaSmsChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaSmsChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaSmsChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
