import { renderHook } from '@testing-library/react';
import * as DeviceCodeConfirmationScreen from '../../src/screens/device-code-confirmation';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/device-code-confirmation', () => {
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

describe('DeviceCodeConfirmation Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(DeviceCodeConfirmationScreen.useUser).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useTenant).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useBranding).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useClient).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useOrganization).toBeDefined();
      expect(DeviceCodeConfirmationScreen.usePrompt).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useScreen).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useTransaction).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(DeviceCodeConfirmationScreen.useCurrentScreen).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useErrors).toBeDefined();
      expect(DeviceCodeConfirmationScreen.useAuth0Themes).toBeDefined();
    });
  });
});
