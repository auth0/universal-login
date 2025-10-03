import { renderHook } from '@testing-library/react';
import * as EmailIdentifierChallengeScreen from '../../src/screens/email-identifier-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/email-identifier-challenge', () => {
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

describe('EmailIdentifierChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(EmailIdentifierChallengeScreen.useUser).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useTenant).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useBranding).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useClient).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useOrganization).toBeDefined();
      expect(EmailIdentifierChallengeScreen.usePrompt).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useScreen).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useTransaction).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(EmailIdentifierChallengeScreen.useCurrentScreen).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useErrors).toBeDefined();
      expect(EmailIdentifierChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
