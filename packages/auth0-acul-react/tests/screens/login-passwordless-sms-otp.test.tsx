import { renderHook } from '@testing-library/react';
import * as LoginPasswordlessSmsOtpScreen from '../../src/screens/login-passwordless-sms-otp';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/login-passwordless-sms-otp', () => {
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

describe('LoginPasswordlessSmsOtp Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(LoginPasswordlessSmsOtpScreen.useUser).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useTenant).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useBranding).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useClient).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useOrganization).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.usePrompt).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useScreen).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useTransaction).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(LoginPasswordlessSmsOtpScreen.useCurrentScreen).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useErrors).toBeDefined();
      expect(LoginPasswordlessSmsOtpScreen.useAuth0Themes).toBeDefined();
    });
  });
});
