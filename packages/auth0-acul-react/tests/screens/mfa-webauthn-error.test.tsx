import { renderHook } from '@testing-library/react';
import * as MfaWebauthnErrorScreen from '../../src/screens/mfa-webauthn-error';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-error', () => {
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

describe('MfaWebauthnError Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnErrorScreen.useUser).toBeDefined();
      expect(MfaWebauthnErrorScreen.useTenant).toBeDefined();
      expect(MfaWebauthnErrorScreen.useBranding).toBeDefined();
      expect(MfaWebauthnErrorScreen.useClient).toBeDefined();
      expect(MfaWebauthnErrorScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnErrorScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnErrorScreen.useScreen).toBeDefined();
      expect(MfaWebauthnErrorScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnErrorScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnErrorScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnErrorScreen.useErrors).toBeDefined();
      expect(MfaWebauthnErrorScreen.useAuth0Themes).toBeDefined();
    });
  });
});
