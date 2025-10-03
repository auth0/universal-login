import { renderHook } from '@testing-library/react';
import * as ConsentScreen from '../../src/screens/consent';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/consent', () => {
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

describe('Consent Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ConsentScreen.useUser).toBeDefined();
      expect(ConsentScreen.useTenant).toBeDefined();
      expect(ConsentScreen.useBranding).toBeDefined();
      expect(ConsentScreen.useClient).toBeDefined();
      expect(ConsentScreen.useOrganization).toBeDefined();
      expect(ConsentScreen.usePrompt).toBeDefined();
      expect(ConsentScreen.useScreen).toBeDefined();
      expect(ConsentScreen.useTransaction).toBeDefined();
      expect(ConsentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ConsentScreen.useCurrentScreen).toBeDefined();
      expect(ConsentScreen.useErrors).toBeDefined();
      expect(ConsentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
