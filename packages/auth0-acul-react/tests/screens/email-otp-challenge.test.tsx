import { renderHook } from '@testing-library/react';
import * as EmailOtpChallengeScreen from '../../src/screens/email-otp-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/email-otp-challenge', () => {
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

describe('EmailOtpChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(EmailOtpChallengeScreen.useUser).toBeDefined();
      expect(EmailOtpChallengeScreen.useTenant).toBeDefined();
      expect(EmailOtpChallengeScreen.useBranding).toBeDefined();
      expect(EmailOtpChallengeScreen.useClient).toBeDefined();
      expect(EmailOtpChallengeScreen.useOrganization).toBeDefined();
      expect(EmailOtpChallengeScreen.usePrompt).toBeDefined();
      expect(EmailOtpChallengeScreen.useScreen).toBeDefined();
      expect(EmailOtpChallengeScreen.useTransaction).toBeDefined();
      expect(EmailOtpChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(EmailOtpChallengeScreen.useCurrentScreen).toBeDefined();
      expect(EmailOtpChallengeScreen.useErrors).toBeDefined();
      expect(EmailOtpChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
