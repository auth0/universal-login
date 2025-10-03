import { renderHook } from '@testing-library/react';
import * as SignupPasswordScreen from '../../src/screens/signup-password';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  SDKUsageError: class SDKUsageError extends Error {},
  UserInputError: class UserInputError extends Error {},
  Auth0ServerError: class Auth0ServerError extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/signup-password', () => {
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

describe('SignupPassword Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(SignupPasswordScreen.useUser).toBeDefined();
      expect(SignupPasswordScreen.useTenant).toBeDefined();
      expect(SignupPasswordScreen.useBranding).toBeDefined();
      expect(SignupPasswordScreen.useClient).toBeDefined();
      expect(SignupPasswordScreen.useOrganization).toBeDefined();
      expect(SignupPasswordScreen.usePrompt).toBeDefined();
      expect(SignupPasswordScreen.useScreen).toBeDefined();
      expect(SignupPasswordScreen.useTransaction).toBeDefined();
      expect(SignupPasswordScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(SignupPasswordScreen.useCurrentScreen).toBeDefined();
      expect(SignupPasswordScreen.useErrors).toBeDefined();
      expect(SignupPasswordScreen.useAuth0Themes).toBeDefined();
    });
  });
});
