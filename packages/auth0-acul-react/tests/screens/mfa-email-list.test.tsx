import { renderHook } from '@testing-library/react';
import * as MfaEmailListScreen from '../../src/screens/mfa-email-list';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-email-list', () => {
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

describe('MfaEmailList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaEmailListScreen.useUser).toBeDefined();
      expect(MfaEmailListScreen.useTenant).toBeDefined();
      expect(MfaEmailListScreen.useBranding).toBeDefined();
      expect(MfaEmailListScreen.useClient).toBeDefined();
      expect(MfaEmailListScreen.useOrganization).toBeDefined();
      expect(MfaEmailListScreen.usePrompt).toBeDefined();
      expect(MfaEmailListScreen.useScreen).toBeDefined();
      expect(MfaEmailListScreen.useTransaction).toBeDefined();
      expect(MfaEmailListScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaEmailListScreen.useCurrentScreen).toBeDefined();
      expect(MfaEmailListScreen.useErrors).toBeDefined();
      expect(MfaEmailListScreen.useAuth0Themes).toBeDefined();
    });
  });
});
