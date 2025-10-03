import { renderHook } from '@testing-library/react';
import * as MfaOtpChallengeScreen from '../../src/screens/mfa-otp-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-otp-challenge', () => {
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

describe('MfaOtpChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaOtpChallengeScreen.useUser).toBeDefined();
      expect(MfaOtpChallengeScreen.useTenant).toBeDefined();
      expect(MfaOtpChallengeScreen.useBranding).toBeDefined();
      expect(MfaOtpChallengeScreen.useClient).toBeDefined();
      expect(MfaOtpChallengeScreen.useOrganization).toBeDefined();
      expect(MfaOtpChallengeScreen.usePrompt).toBeDefined();
      expect(MfaOtpChallengeScreen.useScreen).toBeDefined();
      expect(MfaOtpChallengeScreen.useTransaction).toBeDefined();
      expect(MfaOtpChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaOtpChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaOtpChallengeScreen.useErrors).toBeDefined();
      expect(MfaOtpChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
