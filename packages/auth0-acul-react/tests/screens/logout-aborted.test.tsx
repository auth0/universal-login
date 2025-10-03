import { renderHook } from '@testing-library/react';
import * as LogoutAbortedScreen from '../../src/screens/logout-aborted';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/logout-aborted', () => {
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

describe('LogoutAborted Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LogoutAbortedScreen.useUser).toBeDefined();
      expect(LogoutAbortedScreen.useTenant).toBeDefined();
      expect(LogoutAbortedScreen.useBranding).toBeDefined();
      expect(LogoutAbortedScreen.useClient).toBeDefined();
      expect(LogoutAbortedScreen.useOrganization).toBeDefined();
      expect(LogoutAbortedScreen.usePrompt).toBeDefined();
      expect(LogoutAbortedScreen.useScreen).toBeDefined();
      expect(LogoutAbortedScreen.useTransaction).toBeDefined();
      expect(LogoutAbortedScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LogoutAbortedScreen.useCurrentScreen).toBeDefined();
      expect(LogoutAbortedScreen.useErrors).toBeDefined();
      expect(LogoutAbortedScreen.useAuth0Themes).toBeDefined();
    });
  });
});
