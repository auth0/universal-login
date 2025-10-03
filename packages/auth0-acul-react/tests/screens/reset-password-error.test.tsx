import { renderHook } from '@testing-library/react';
import * as ResetPasswordErrorScreen from '../../src/screens/reset-password-error';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-error', () => {
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

describe('ResetPasswordError Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordErrorScreen.useUser).toBeDefined();
      expect(ResetPasswordErrorScreen.useTenant).toBeDefined();
      expect(ResetPasswordErrorScreen.useBranding).toBeDefined();
      expect(ResetPasswordErrorScreen.useClient).toBeDefined();
      expect(ResetPasswordErrorScreen.useOrganization).toBeDefined();
      expect(ResetPasswordErrorScreen.usePrompt).toBeDefined();
      expect(ResetPasswordErrorScreen.useScreen).toBeDefined();
      expect(ResetPasswordErrorScreen.useTransaction).toBeDefined();
      expect(ResetPasswordErrorScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordErrorScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordErrorScreen.useErrors).toBeDefined();
      expect(ResetPasswordErrorScreen.useAuth0Themes).toBeDefined();
    });
  });
});
