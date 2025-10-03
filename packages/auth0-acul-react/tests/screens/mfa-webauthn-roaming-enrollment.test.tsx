import { renderHook } from '@testing-library/react';
import * as MfaWebauthnRoamingEnrollmentScreen from '../../src/screens/mfa-webauthn-roaming-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment', () => {
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

describe('MfaWebauthnRoamingEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnRoamingEnrollmentScreen.useUser).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useClient).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnRoamingEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
