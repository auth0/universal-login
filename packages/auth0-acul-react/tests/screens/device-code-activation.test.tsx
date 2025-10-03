import { renderHook } from '@testing-library/react';
import * as DeviceCodeActivationScreen from '../../src/screens/device-code-activation';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/device-code-activation', () => {
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

describe('DeviceCodeActivation Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(DeviceCodeActivationScreen.useUser).toBeDefined();
      expect(DeviceCodeActivationScreen.useTenant).toBeDefined();
      expect(DeviceCodeActivationScreen.useBranding).toBeDefined();
      expect(DeviceCodeActivationScreen.useClient).toBeDefined();
      expect(DeviceCodeActivationScreen.useOrganization).toBeDefined();
      expect(DeviceCodeActivationScreen.usePrompt).toBeDefined();
      expect(DeviceCodeActivationScreen.useScreen).toBeDefined();
      expect(DeviceCodeActivationScreen.useTransaction).toBeDefined();
      expect(DeviceCodeActivationScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(DeviceCodeActivationScreen.useCurrentScreen).toBeDefined();
      expect(DeviceCodeActivationScreen.useErrors).toBeDefined();
      expect(DeviceCodeActivationScreen.useAuth0Themes).toBeDefined();
    });
  });
});
