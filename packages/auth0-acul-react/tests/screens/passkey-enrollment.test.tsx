import { renderHook } from '@testing-library/react';
import * as PasskeyEnrollmentScreen from '../../src/screens/passkey-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/passkey-enrollment', () => {
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

describe('PasskeyEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(PasskeyEnrollmentScreen.useUser).toBeDefined();
      expect(PasskeyEnrollmentScreen.useTenant).toBeDefined();
      expect(PasskeyEnrollmentScreen.useBranding).toBeDefined();
      expect(PasskeyEnrollmentScreen.useClient).toBeDefined();
      expect(PasskeyEnrollmentScreen.useOrganization).toBeDefined();
      expect(PasskeyEnrollmentScreen.usePrompt).toBeDefined();
      expect(PasskeyEnrollmentScreen.useScreen).toBeDefined();
      expect(PasskeyEnrollmentScreen.useTransaction).toBeDefined();
      expect(PasskeyEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(PasskeyEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(PasskeyEnrollmentScreen.useErrors).toBeDefined();
      expect(PasskeyEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
