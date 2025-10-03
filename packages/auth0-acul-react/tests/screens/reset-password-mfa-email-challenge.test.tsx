import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaEmailChallengeScreen from '../../src/screens/reset-password-mfa-email-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-email-challenge', () => {
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

describe('ResetPasswordMfaEmailChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaEmailChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaEmailChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaEmailChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
