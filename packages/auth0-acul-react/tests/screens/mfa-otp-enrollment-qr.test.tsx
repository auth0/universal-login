import { renderHook } from '@testing-library/react';
import * as MfaOtpEnrollmentQrScreen from '../../src/screens/mfa-otp-enrollment-qr';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-otp-enrollment-qr', () => {
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

describe('MfaOtpEnrollmentQr Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaOtpEnrollmentQrScreen.useUser).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useTenant).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useBranding).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useClient).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useOrganization).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.usePrompt).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useScreen).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useTransaction).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaOtpEnrollmentQrScreen.useCurrentScreen).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useErrors).toBeDefined();
      expect(MfaOtpEnrollmentQrScreen.useAuth0Themes).toBeDefined();
    });
  });
});
