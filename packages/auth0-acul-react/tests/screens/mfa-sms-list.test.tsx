import { renderHook } from '@testing-library/react';
import * as MfaSmsListScreen from '../../src/screens/mfa-sms-list';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-sms-list', () => {
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

describe('MfaSmsList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaSmsListScreen.useUser).toBeDefined();
      expect(MfaSmsListScreen.useTenant).toBeDefined();
      expect(MfaSmsListScreen.useBranding).toBeDefined();
      expect(MfaSmsListScreen.useClient).toBeDefined();
      expect(MfaSmsListScreen.useOrganization).toBeDefined();
      expect(MfaSmsListScreen.usePrompt).toBeDefined();
      expect(MfaSmsListScreen.useScreen).toBeDefined();
      expect(MfaSmsListScreen.useTransaction).toBeDefined();
      expect(MfaSmsListScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaSmsListScreen.useCurrentScreen).toBeDefined();
      expect(MfaSmsListScreen.useErrors).toBeDefined();
      expect(MfaSmsListScreen.useAuth0Themes).toBeDefined();
    });
  });
});
