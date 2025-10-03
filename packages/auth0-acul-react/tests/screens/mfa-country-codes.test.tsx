import { renderHook } from '@testing-library/react';
import * as MfaCountryCodesScreen from '../../src/screens/mfa-country-codes';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-country-codes', () => {
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

describe('MfaCountryCodes Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaCountryCodesScreen.useUser).toBeDefined();
      expect(MfaCountryCodesScreen.useTenant).toBeDefined();
      expect(MfaCountryCodesScreen.useBranding).toBeDefined();
      expect(MfaCountryCodesScreen.useClient).toBeDefined();
      expect(MfaCountryCodesScreen.useOrganization).toBeDefined();
      expect(MfaCountryCodesScreen.usePrompt).toBeDefined();
      expect(MfaCountryCodesScreen.useScreen).toBeDefined();
      expect(MfaCountryCodesScreen.useTransaction).toBeDefined();
      expect(MfaCountryCodesScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaCountryCodesScreen.useCurrentScreen).toBeDefined();
      expect(MfaCountryCodesScreen.useErrors).toBeDefined();
      expect(MfaCountryCodesScreen.useAuth0Themes).toBeDefined();
    });
  });
});
