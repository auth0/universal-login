import { renderHook } from '@testing-library/react';
import * as DeviceCodeActivationAllowedScreen from '../../src/screens/device-code-activation-allowed';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/device-code-activation-allowed', () => {
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

describe('DeviceCodeActivationAllowed Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(DeviceCodeActivationAllowedScreen.useUser).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useTenant).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useBranding).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useClient).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useOrganization).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.usePrompt).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useScreen).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useTransaction).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(DeviceCodeActivationAllowedScreen.useCurrentScreen).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useErrors).toBeDefined();
      expect(DeviceCodeActivationAllowedScreen.useAuth0Themes).toBeDefined();
    });
  });
});
