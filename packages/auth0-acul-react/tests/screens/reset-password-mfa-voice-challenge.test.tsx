import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaVoiceChallengeScreen from '../../src/screens/reset-password-mfa-voice-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-voice-challenge', () => {
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

describe('ResetPasswordMfaVoiceChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaVoiceChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaVoiceChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaVoiceChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
