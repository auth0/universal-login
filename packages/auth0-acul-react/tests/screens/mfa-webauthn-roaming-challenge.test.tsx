import { renderHook } from '@testing-library/react';
import * as MfaWebauthnRoamingChallengeScreen from '../../src/screens/mfa-webauthn-roaming-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge', () => {
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

describe('MfaWebauthnRoamingChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnRoamingChallengeScreen.useUser).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useTenant).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useBranding).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useClient).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useScreen).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnRoamingChallengeScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useErrors).toBeDefined();
      expect(MfaWebauthnRoamingChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
