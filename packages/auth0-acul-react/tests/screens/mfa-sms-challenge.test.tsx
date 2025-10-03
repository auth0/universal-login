import { renderHook } from '@testing-library/react';
import * as MfaSmsChallengeScreen from '../../src/screens/mfa-sms-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-sms-challenge', () => {
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

describe('MfaSmsChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaSmsChallengeScreen.useUser).toBeDefined();
      expect(MfaSmsChallengeScreen.useTenant).toBeDefined();
      expect(MfaSmsChallengeScreen.useBranding).toBeDefined();
      expect(MfaSmsChallengeScreen.useClient).toBeDefined();
      expect(MfaSmsChallengeScreen.useOrganization).toBeDefined();
      expect(MfaSmsChallengeScreen.usePrompt).toBeDefined();
      expect(MfaSmsChallengeScreen.useScreen).toBeDefined();
      expect(MfaSmsChallengeScreen.useTransaction).toBeDefined();
      expect(MfaSmsChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaSmsChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaSmsChallengeScreen.useErrors).toBeDefined();
      expect(MfaSmsChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
