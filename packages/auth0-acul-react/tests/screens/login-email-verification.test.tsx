import { renderHook } from '@testing-library/react';
import * as LoginEmailVerificationScreen from '../../src/screens/login-email-verification';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/login-email-verification', () => {
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

describe('LoginEmailVerification Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LoginEmailVerificationScreen.useUser).toBeDefined();
      expect(LoginEmailVerificationScreen.useTenant).toBeDefined();
      expect(LoginEmailVerificationScreen.useBranding).toBeDefined();
      expect(LoginEmailVerificationScreen.useClient).toBeDefined();
      expect(LoginEmailVerificationScreen.useOrganization).toBeDefined();
      expect(LoginEmailVerificationScreen.usePrompt).toBeDefined();
      expect(LoginEmailVerificationScreen.useScreen).toBeDefined();
      expect(LoginEmailVerificationScreen.useTransaction).toBeDefined();
      expect(LoginEmailVerificationScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LoginEmailVerificationScreen.useCurrentScreen).toBeDefined();
      expect(LoginEmailVerificationScreen.useErrors).toBeDefined();
      expect(LoginEmailVerificationScreen.useAuth0Themes).toBeDefined();
    });
  });
});
