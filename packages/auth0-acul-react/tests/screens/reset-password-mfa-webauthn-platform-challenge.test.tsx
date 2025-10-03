import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaWebauthnPlatformChallengeScreen from '../../src/screens/reset-password-mfa-webauthn-platform-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge', () => {
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

describe('ResetPasswordMfaWebauthnPlatformChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaWebauthnPlatformChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
