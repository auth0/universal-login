import { renderHook } from '@testing-library/react';
import * as LoginPasswordlessEmailCodeScreen from '../../src/screens/login-passwordless-email-code';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/login-passwordless-email-code', () => {
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

describe('LoginPasswordlessEmailCode Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LoginPasswordlessEmailCodeScreen.useUser).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useTenant).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useBranding).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useClient).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useOrganization).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.usePrompt).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useScreen).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useTransaction).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LoginPasswordlessEmailCodeScreen.useCurrentScreen).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useErrors).toBeDefined();
      expect(LoginPasswordlessEmailCodeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
