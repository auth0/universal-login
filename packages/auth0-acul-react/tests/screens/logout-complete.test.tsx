import { renderHook } from '@testing-library/react';
import * as LogoutCompleteScreen from '../../src/screens/logout-complete';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/logout-complete', () => {
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

describe('LogoutComplete Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LogoutCompleteScreen.useUser).toBeDefined();
      expect(LogoutCompleteScreen.useTenant).toBeDefined();
      expect(LogoutCompleteScreen.useBranding).toBeDefined();
      expect(LogoutCompleteScreen.useClient).toBeDefined();
      expect(LogoutCompleteScreen.useOrganization).toBeDefined();
      expect(LogoutCompleteScreen.usePrompt).toBeDefined();
      expect(LogoutCompleteScreen.useScreen).toBeDefined();
      expect(LogoutCompleteScreen.useTransaction).toBeDefined();
      expect(LogoutCompleteScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LogoutCompleteScreen.useCurrentScreen).toBeDefined();
      expect(LogoutCompleteScreen.useErrors).toBeDefined();
      expect(LogoutCompleteScreen.useAuth0Themes).toBeDefined();
    });
  });
});
