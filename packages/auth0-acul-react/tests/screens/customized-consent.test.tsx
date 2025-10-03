import { renderHook } from '@testing-library/react';
import * as CustomizedConsentScreen from '../../src/screens/customized-consent';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/customized-consent', () => {
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

describe('CustomizedConsent Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(CustomizedConsentScreen.useUser).toBeDefined();
      expect(CustomizedConsentScreen.useTenant).toBeDefined();
      expect(CustomizedConsentScreen.useBranding).toBeDefined();
      expect(CustomizedConsentScreen.useClient).toBeDefined();
      expect(CustomizedConsentScreen.useOrganization).toBeDefined();
      expect(CustomizedConsentScreen.usePrompt).toBeDefined();
      expect(CustomizedConsentScreen.useScreen).toBeDefined();
      expect(CustomizedConsentScreen.useTransaction).toBeDefined();
      expect(CustomizedConsentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(CustomizedConsentScreen.useCurrentScreen).toBeDefined();
      expect(CustomizedConsentScreen.useErrors).toBeDefined();
      expect(CustomizedConsentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
