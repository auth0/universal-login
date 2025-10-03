import { renderHook } from '@testing-library/react';
import * as MfaPushWelcomeScreen from '../../src/screens/mfa-push-welcome';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-push-welcome', () => {
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

describe('MfaPushWelcome Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPushWelcomeScreen.useUser).toBeDefined();
      expect(MfaPushWelcomeScreen.useTenant).toBeDefined();
      expect(MfaPushWelcomeScreen.useBranding).toBeDefined();
      expect(MfaPushWelcomeScreen.useClient).toBeDefined();
      expect(MfaPushWelcomeScreen.useOrganization).toBeDefined();
      expect(MfaPushWelcomeScreen.usePrompt).toBeDefined();
      expect(MfaPushWelcomeScreen.useScreen).toBeDefined();
      expect(MfaPushWelcomeScreen.useTransaction).toBeDefined();
      expect(MfaPushWelcomeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPushWelcomeScreen.useCurrentScreen).toBeDefined();
      expect(MfaPushWelcomeScreen.useErrors).toBeDefined();
      expect(MfaPushWelcomeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
