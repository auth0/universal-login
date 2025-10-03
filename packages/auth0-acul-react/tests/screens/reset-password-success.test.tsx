import { renderHook } from '@testing-library/react';
import * as ResetPasswordSuccessScreen from '../../src/screens/reset-password-success';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-success', () => {
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

describe('ResetPasswordSuccess Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordSuccessScreen.useUser).toBeDefined();
      expect(ResetPasswordSuccessScreen.useTenant).toBeDefined();
      expect(ResetPasswordSuccessScreen.useBranding).toBeDefined();
      expect(ResetPasswordSuccessScreen.useClient).toBeDefined();
      expect(ResetPasswordSuccessScreen.useOrganization).toBeDefined();
      expect(ResetPasswordSuccessScreen.usePrompt).toBeDefined();
      expect(ResetPasswordSuccessScreen.useScreen).toBeDefined();
      expect(ResetPasswordSuccessScreen.useTransaction).toBeDefined();
      expect(ResetPasswordSuccessScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordSuccessScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordSuccessScreen.useErrors).toBeDefined();
      expect(ResetPasswordSuccessScreen.useAuth0Themes).toBeDefined();
    });
  });
});
