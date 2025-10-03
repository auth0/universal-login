import { renderHook } from '@testing-library/react';
import * as ResetPasswordMfaWebauthnRoamingChallengeScreen from '../../src/screens/reset-password-mfa-webauthn-roaming-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge', () => {
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

describe('ResetPasswordMfaWebauthnRoamingChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useUser).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useTenant).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useBranding).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useClient).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useOrganization).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.usePrompt).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useScreen).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useTransaction).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useErrors).toBeDefined();
      expect(ResetPasswordMfaWebauthnRoamingChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
