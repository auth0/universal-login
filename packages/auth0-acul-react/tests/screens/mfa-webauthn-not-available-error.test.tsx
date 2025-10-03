import { renderHook } from '@testing-library/react';
import * as MfaWebauthnNotAvailableErrorScreen from '../../src/screens/mfa-webauthn-not-available-error';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-not-available-error', () => {
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

describe('MfaWebauthnNotAvailableError Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnNotAvailableErrorScreen.useUser).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useTenant).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useBranding).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useClient).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useScreen).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnNotAvailableErrorScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useErrors).toBeDefined();
      expect(MfaWebauthnNotAvailableErrorScreen.useAuth0Themes).toBeDefined();
    });
  });
});
