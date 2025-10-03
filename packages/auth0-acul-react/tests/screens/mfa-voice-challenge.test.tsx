import { renderHook } from '@testing-library/react';
import * as MfaVoiceChallengeScreen from '../../src/screens/mfa-voice-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-voice-challenge', () => {
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

describe('MfaVoiceChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaVoiceChallengeScreen.useUser).toBeDefined();
      expect(MfaVoiceChallengeScreen.useTenant).toBeDefined();
      expect(MfaVoiceChallengeScreen.useBranding).toBeDefined();
      expect(MfaVoiceChallengeScreen.useClient).toBeDefined();
      expect(MfaVoiceChallengeScreen.useOrganization).toBeDefined();
      expect(MfaVoiceChallengeScreen.usePrompt).toBeDefined();
      expect(MfaVoiceChallengeScreen.useScreen).toBeDefined();
      expect(MfaVoiceChallengeScreen.useTransaction).toBeDefined();
      expect(MfaVoiceChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaVoiceChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaVoiceChallengeScreen.useErrors).toBeDefined();
      expect(MfaVoiceChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
