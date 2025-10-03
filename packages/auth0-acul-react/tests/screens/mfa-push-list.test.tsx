import { renderHook } from '@testing-library/react';
import * as MfaPushListScreen from '../../src/screens/mfa-push-list';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-push-list', () => {
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

describe('MfaPushList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPushListScreen.useUser).toBeDefined();
      expect(MfaPushListScreen.useTenant).toBeDefined();
      expect(MfaPushListScreen.useBranding).toBeDefined();
      expect(MfaPushListScreen.useClient).toBeDefined();
      expect(MfaPushListScreen.useOrganization).toBeDefined();
      expect(MfaPushListScreen.usePrompt).toBeDefined();
      expect(MfaPushListScreen.useScreen).toBeDefined();
      expect(MfaPushListScreen.useTransaction).toBeDefined();
      expect(MfaPushListScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPushListScreen.useCurrentScreen).toBeDefined();
      expect(MfaPushListScreen.useErrors).toBeDefined();
      expect(MfaPushListScreen.useAuth0Themes).toBeDefined();
    });
  });
});
