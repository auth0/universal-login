import { renderHook } from '@testing-library/react';
import * as MfaOtpEnrollmentCodeScreen from '../../src/screens/mfa-otp-enrollment-code';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-otp-enrollment-code', () => {
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

describe('MfaOtpEnrollmentCode Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaOtpEnrollmentCodeScreen.useUser).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useTenant).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useBranding).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useClient).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useOrganization).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.usePrompt).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useScreen).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useTransaction).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaOtpEnrollmentCodeScreen.useCurrentScreen).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useErrors).toBeDefined();
      expect(MfaOtpEnrollmentCodeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
