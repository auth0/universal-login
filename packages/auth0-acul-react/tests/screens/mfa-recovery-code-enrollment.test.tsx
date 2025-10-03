import { renderHook } from '@testing-library/react';
import * as MfaRecoveryCodeEnrollmentScreen from '../../src/screens/mfa-recovery-code-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-recovery-code-enrollment', () => {
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

describe('MfaRecoveryCodeEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaRecoveryCodeEnrollmentScreen.useUser).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useClient).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaRecoveryCodeEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaRecoveryCodeEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
