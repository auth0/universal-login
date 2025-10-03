import { renderHook } from '@testing-library/react';
import * as LogoutScreen from '../../src/screens/logout';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/logout', () => {
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

describe('Logout Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LogoutScreen.useUser).toBeDefined();
      expect(LogoutScreen.useTenant).toBeDefined();
      expect(LogoutScreen.useBranding).toBeDefined();
      expect(LogoutScreen.useClient).toBeDefined();
      expect(LogoutScreen.useOrganization).toBeDefined();
      expect(LogoutScreen.usePrompt).toBeDefined();
      expect(LogoutScreen.useScreen).toBeDefined();
      expect(LogoutScreen.useTransaction).toBeDefined();
      expect(LogoutScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LogoutScreen.useCurrentScreen).toBeDefined();
      expect(LogoutScreen.useErrors).toBeDefined();
      expect(LogoutScreen.useAuth0Themes).toBeDefined();
    });
  });
});
