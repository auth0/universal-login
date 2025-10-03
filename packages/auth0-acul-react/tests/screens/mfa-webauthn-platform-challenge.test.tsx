import { renderHook } from '@testing-library/react';
import * as MfaWebauthnPlatformChallengeScreen from '../../src/screens/mfa-webauthn-platform-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-platform-challenge', () => {
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

describe('MfaWebauthnPlatformChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnPlatformChallengeScreen.useUser).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useTenant).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useBranding).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useClient).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useScreen).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnPlatformChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useErrors).toBeDefined();
      expect(MfaWebauthnPlatformChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
