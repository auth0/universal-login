import { renderHook } from '@testing-library/react';
import * as MfaEnrollResultScreen from '../../src/screens/mfa-enroll-result';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-enroll-result', () => {
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

describe('MfaEnrollResult Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaEnrollResultScreen.useUser).toBeDefined();
      expect(MfaEnrollResultScreen.useTenant).toBeDefined();
      expect(MfaEnrollResultScreen.useBranding).toBeDefined();
      expect(MfaEnrollResultScreen.useClient).toBeDefined();
      expect(MfaEnrollResultScreen.useOrganization).toBeDefined();
      expect(MfaEnrollResultScreen.usePrompt).toBeDefined();
      expect(MfaEnrollResultScreen.useScreen).toBeDefined();
      expect(MfaEnrollResultScreen.useTransaction).toBeDefined();
      expect(MfaEnrollResultScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaEnrollResultScreen.useCurrentScreen).toBeDefined();
      expect(MfaEnrollResultScreen.useErrors).toBeDefined();
      expect(MfaEnrollResultScreen.useAuth0Themes).toBeDefined();
    });
  });
});
