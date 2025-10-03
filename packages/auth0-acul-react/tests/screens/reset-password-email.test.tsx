import { renderHook } from '@testing-library/react';
import * as ResetPasswordEmailScreen from '../../src/screens/reset-password-email';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-email', () => {
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

describe('ResetPasswordEmail Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordEmailScreen.useUser).toBeDefined();
      expect(ResetPasswordEmailScreen.useTenant).toBeDefined();
      expect(ResetPasswordEmailScreen.useBranding).toBeDefined();
      expect(ResetPasswordEmailScreen.useClient).toBeDefined();
      expect(ResetPasswordEmailScreen.useOrganization).toBeDefined();
      expect(ResetPasswordEmailScreen.usePrompt).toBeDefined();
      expect(ResetPasswordEmailScreen.useScreen).toBeDefined();
      expect(ResetPasswordEmailScreen.useTransaction).toBeDefined();
      expect(ResetPasswordEmailScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordEmailScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordEmailScreen.useErrors).toBeDefined();
      expect(ResetPasswordEmailScreen.useAuth0Themes).toBeDefined();
    });
  });
});
