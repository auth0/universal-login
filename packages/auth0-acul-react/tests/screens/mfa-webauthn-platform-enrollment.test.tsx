import { renderHook } from '@testing-library/react';
import * as MfaWebauthnPlatformEnrollmentScreen from '../../src/screens/mfa-webauthn-platform-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment', () => {
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

describe('MfaWebauthnPlatformEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useUser).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useClient).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
