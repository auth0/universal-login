import { renderHook } from '@testing-library/react';
import * as EmailVerificationResultScreen from '../../src/screens/email-verification-result';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/email-verification-result', () => {
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

describe('EmailVerificationResult Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(EmailVerificationResultScreen.useUser).toBeDefined();
      expect(EmailVerificationResultScreen.useTenant).toBeDefined();
      expect(EmailVerificationResultScreen.useBranding).toBeDefined();
      expect(EmailVerificationResultScreen.useClient).toBeDefined();
      expect(EmailVerificationResultScreen.useOrganization).toBeDefined();
      expect(EmailVerificationResultScreen.usePrompt).toBeDefined();
      expect(EmailVerificationResultScreen.useScreen).toBeDefined();
      expect(EmailVerificationResultScreen.useTransaction).toBeDefined();
      expect(EmailVerificationResultScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(EmailVerificationResultScreen.useCurrentScreen).toBeDefined();
      expect(EmailVerificationResultScreen.useErrors).toBeDefined();
      expect(EmailVerificationResultScreen.useAuth0Themes).toBeDefined();
    });
  });
});
