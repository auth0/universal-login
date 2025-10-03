import { renderHook } from '@testing-library/react';
import * as MfaPhoneEnrollmentScreen from '../../src/screens/mfa-phone-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-phone-enrollment', () => {
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

describe('MfaPhoneEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPhoneEnrollmentScreen.useUser).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useClient).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPhoneEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaPhoneEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
