import { renderHook } from '@testing-library/react';
import * as PhoneIdentifierEnrollmentScreen from '../../src/screens/phone-identifier-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/phone-identifier-enrollment', () => {
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

describe('PhoneIdentifierEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(PhoneIdentifierEnrollmentScreen.useUser).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useTenant).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useBranding).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useClient).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useOrganization).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.usePrompt).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useScreen).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useTransaction).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(PhoneIdentifierEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useErrors).toBeDefined();
      expect(PhoneIdentifierEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
