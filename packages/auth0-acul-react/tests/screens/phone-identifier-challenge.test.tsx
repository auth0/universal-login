import { renderHook } from '@testing-library/react';
import * as PhoneIdentifierChallengeScreen from '../../src/screens/phone-identifier-challenge';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/phone-identifier-challenge', () => {
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

describe('PhoneIdentifierChallenge Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(PhoneIdentifierChallengeScreen.useUser).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useTenant).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useBranding).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useClient).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useOrganization).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.usePrompt).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useScreen).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useTransaction).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(PhoneIdentifierChallengeScreen.useCurrentScreen).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useErrors).toBeDefined();
      expect(PhoneIdentifierChallengeScreen.useAuth0Themes).toBeDefined();
    });
  });
});
