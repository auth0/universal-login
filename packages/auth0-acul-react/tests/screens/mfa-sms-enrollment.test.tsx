import { renderHook } from '@testing-library/react';
import * as MfaSmsEnrollmentScreen from '../../src/screens/mfa-sms-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-sms-enrollment', () => {
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

describe('MfaSmsEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaSmsEnrollmentScreen.useUser).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useClient).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaSmsEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaSmsEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaSmsEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
