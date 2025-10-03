import { renderHook } from '@testing-library/react';
import * as MfaLoginOptionsScreen from '../../src/screens/mfa-login-options';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-login-options', () => {
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

describe('MfaLoginOptions Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaLoginOptionsScreen.useUser).toBeDefined();
      expect(MfaLoginOptionsScreen.useTenant).toBeDefined();
      expect(MfaLoginOptionsScreen.useBranding).toBeDefined();
      expect(MfaLoginOptionsScreen.useClient).toBeDefined();
      expect(MfaLoginOptionsScreen.useOrganization).toBeDefined();
      expect(MfaLoginOptionsScreen.usePrompt).toBeDefined();
      expect(MfaLoginOptionsScreen.useScreen).toBeDefined();
      expect(MfaLoginOptionsScreen.useTransaction).toBeDefined();
      expect(MfaLoginOptionsScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaLoginOptionsScreen.useCurrentScreen).toBeDefined();
      expect(MfaLoginOptionsScreen.useErrors).toBeDefined();
      expect(MfaLoginOptionsScreen.useAuth0Themes).toBeDefined();
    });
  });
});
