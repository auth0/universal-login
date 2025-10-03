import { renderHook } from '@testing-library/react';
import * as LoginScreen from '../../src/screens/login';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/login', () => {
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

describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LoginScreen.useUser).toBeDefined();
      expect(LoginScreen.useTenant).toBeDefined();
      expect(LoginScreen.useBranding).toBeDefined();
      expect(LoginScreen.useClient).toBeDefined();
      expect(LoginScreen.useOrganization).toBeDefined();
      expect(LoginScreen.usePrompt).toBeDefined();
      expect(LoginScreen.useScreen).toBeDefined();
      expect(LoginScreen.useTransaction).toBeDefined();
      expect(LoginScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LoginScreen.useCurrentScreen).toBeDefined();
      expect(LoginScreen.useErrors).toBeDefined();
      expect(LoginScreen.useAuth0Themes).toBeDefined();
    });
  });
});
