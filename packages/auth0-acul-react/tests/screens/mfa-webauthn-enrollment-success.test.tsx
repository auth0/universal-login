import { renderHook } from '@testing-library/react';
import * as MfaWebauthnEnrollmentSuccessScreen from '../../src/screens/mfa-webauthn-enrollment-success';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-enrollment-success', () => {
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

describe('MfaWebauthnEnrollmentSuccess Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnEnrollmentSuccessScreen.useUser).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useTenant).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useBranding).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useClient).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useScreen).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnEnrollmentSuccessScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useErrors).toBeDefined();
      expect(MfaWebauthnEnrollmentSuccessScreen.useAuth0Themes).toBeDefined();
    });
  });
});
