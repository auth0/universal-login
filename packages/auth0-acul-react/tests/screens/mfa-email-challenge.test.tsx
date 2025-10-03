import { renderHook } from '@testing-library/react';
import * as MfaEmailChallengeScreen from '../../src/screens/mfa-email-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-email-challenge', () => {
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

describe('MfaEmailChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaEmailChallengeScreen.useUser).toBeDefined();
      expect(MfaEmailChallengeScreen.useTenant).toBeDefined();
      expect(MfaEmailChallengeScreen.useBranding).toBeDefined();
      expect(MfaEmailChallengeScreen.useClient).toBeDefined();
      expect(MfaEmailChallengeScreen.useOrganization).toBeDefined();
      expect(MfaEmailChallengeScreen.usePrompt).toBeDefined();
      expect(MfaEmailChallengeScreen.useScreen).toBeDefined();
      expect(MfaEmailChallengeScreen.useTransaction).toBeDefined();
      expect(MfaEmailChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaEmailChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaEmailChallengeScreen.useErrors).toBeDefined();
      expect(MfaEmailChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
