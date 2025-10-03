import { renderHook } from '@testing-library/react';
import * as MfaRecoveryCodeChallengeScreen from '../../src/screens/mfa-recovery-code-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-recovery-code-challenge', () => {
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

describe('MfaRecoveryCodeChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaRecoveryCodeChallengeScreen.useUser).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useTenant).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useBranding).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useClient).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useOrganization).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.usePrompt).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useScreen).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useTransaction).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaRecoveryCodeChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useErrors).toBeDefined();
      expect(MfaRecoveryCodeChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
