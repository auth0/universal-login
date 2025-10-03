import { renderHook } from '@testing-library/react';
import * as PasskeyEnrollmentLocalScreen from '../../src/screens/passkey-enrollment-local';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/passkey-enrollment-local', () => {
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

describe('PasskeyEnrollmentLocal Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(PasskeyEnrollmentLocalScreen.useUser).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useTenant).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useBranding).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useClient).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useOrganization).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.usePrompt).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useScreen).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useTransaction).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(PasskeyEnrollmentLocalScreen.useCurrentScreen).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useErrors).toBeDefined();
      expect(PasskeyEnrollmentLocalScreen.useAuth0Themes).toBeDefined();
    });
  });
});
