import { renderHook } from '@testing-library/react';
import * as MfaRecoveryCodeChallengeNewCodeScreen from '../../src/screens/mfa-recovery-code-challenge-new-code';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code', () => {
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

describe('MfaRecoveryCodeChallengeNewCode Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useUser).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useTenant).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useBranding).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useClient).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useOrganization).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.usePrompt).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useScreen).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useTransaction).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useCurrentScreen).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useErrors).toBeDefined();
      expect(MfaRecoveryCodeChallengeNewCodeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
