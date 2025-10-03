import { renderHook } from '@testing-library/react';
import * as LoginPasswordScreen from '../../src/screens/login-password';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  SDKUsageError: class SDKUsageError extends Error {},
  UserInputError: class UserInputError extends Error {},
  Auth0ServerError: class Auth0ServerError extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/login-password', () => {
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

describe('LoginPassword Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LoginPasswordScreen.useUser).toBeDefined();
      expect(LoginPasswordScreen.useTenant).toBeDefined();
      expect(LoginPasswordScreen.useBranding).toBeDefined();
      expect(LoginPasswordScreen.useClient).toBeDefined();
      expect(LoginPasswordScreen.useOrganization).toBeDefined();
      expect(LoginPasswordScreen.usePrompt).toBeDefined();
      expect(LoginPasswordScreen.useScreen).toBeDefined();
      expect(LoginPasswordScreen.useTransaction).toBeDefined();
      expect(LoginPasswordScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LoginPasswordScreen.useCurrentScreen).toBeDefined();
      expect(LoginPasswordScreen.useErrors).toBeDefined();
      expect(LoginPasswordScreen.useAuth0Themes).toBeDefined();
    });
  });
});
