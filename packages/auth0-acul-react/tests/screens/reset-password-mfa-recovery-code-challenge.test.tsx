import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaRecoveryCodeChallengeScreen from '../../src/screens/reset-password-mfa-recovery-code-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge', () => {
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

describe('ResetPasswordMfaRecoveryCodeChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaRecoveryCodeChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
