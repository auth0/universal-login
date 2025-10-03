import { renderHook } from '@testing-library/react';
import * as DeviceCodeActivationDeniedScreen from '../../src/screens/device-code-activation-denied';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/device-code-activation-denied', () => {
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

describe('DeviceCodeActivationDenied Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(DeviceCodeActivationDeniedScreen.useUser).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useTenant).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useBranding).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useClient).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useOrganization).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.usePrompt).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useScreen).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useTransaction).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(DeviceCodeActivationDeniedScreen.useCurrentScreen).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useErrors).toBeDefined();
      expect(DeviceCodeActivationDeniedScreen.useAuth0Themes).toBeDefined();
    });
  });
});
