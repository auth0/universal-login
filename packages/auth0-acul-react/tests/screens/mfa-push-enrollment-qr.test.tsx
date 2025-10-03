import { renderHook } from '@testing-library/react';
import * as MfaPushEnrollmentQrScreen from '../../src/screens/mfa-push-enrollment-qr';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-push-enrollment-qr', () => {
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

describe('MfaPushEnrollmentQr Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPushEnrollmentQrScreen.useUser).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useTenant).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useBranding).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useClient).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useOrganization).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.usePrompt).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useScreen).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useTransaction).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPushEnrollmentQrScreen.useCurrentScreen).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useErrors).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useAuth0Themes).toBeDefined();
    });
  });
});
