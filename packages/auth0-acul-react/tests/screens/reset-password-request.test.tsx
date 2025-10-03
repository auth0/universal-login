import { renderHook } from '@testing-library/react';
import * as ResetPasswordRequestScreen from '../../src/screens/reset-password-request';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/reset-password-request', () => {
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

describe('ResetPasswordRequest Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ResetPasswordRequestScreen.useUser).toBeDefined();
      expect(ResetPasswordRequestScreen.useTenant).toBeDefined();
      expect(ResetPasswordRequestScreen.useBranding).toBeDefined();
      expect(ResetPasswordRequestScreen.useClient).toBeDefined();
      expect(ResetPasswordRequestScreen.useOrganization).toBeDefined();
      expect(ResetPasswordRequestScreen.usePrompt).toBeDefined();
      expect(ResetPasswordRequestScreen.useScreen).toBeDefined();
      expect(ResetPasswordRequestScreen.useTransaction).toBeDefined();
      expect(ResetPasswordRequestScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ResetPasswordRequestScreen.useCurrentScreen).toBeDefined();
      expect(ResetPasswordRequestScreen.useErrors).toBeDefined();
      expect(ResetPasswordRequestScreen.useAuth0Themes).toBeDefined();
    });
  });
});
