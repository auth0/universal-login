import { renderHook } from '@testing-library/react';
import * as MfaPhoneChallengeScreen from '../../src/screens/mfa-phone-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-phone-challenge', () => {
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

describe('MfaPhoneChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPhoneChallengeScreen.useUser).toBeDefined();
      expect(MfaPhoneChallengeScreen.useTenant).toBeDefined();
      expect(MfaPhoneChallengeScreen.useBranding).toBeDefined();
      expect(MfaPhoneChallengeScreen.useClient).toBeDefined();
      expect(MfaPhoneChallengeScreen.useOrganization).toBeDefined();
      expect(MfaPhoneChallengeScreen.usePrompt).toBeDefined();
      expect(MfaPhoneChallengeScreen.useScreen).toBeDefined();
      expect(MfaPhoneChallengeScreen.useTransaction).toBeDefined();
      expect(MfaPhoneChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPhoneChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaPhoneChallengeScreen.useErrors).toBeDefined();
      expect(MfaPhoneChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
