import { renderHook } from '@testing-library/react';
import * as MfaBeginEnrollOptionsScreen from '../../src/screens/mfa-begin-enroll-options';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-begin-enroll-options', () => {
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

describe('MfaBeginEnrollOptions Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaBeginEnrollOptionsScreen.useUser).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useTenant).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useBranding).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useClient).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useOrganization).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.usePrompt).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useScreen).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useTransaction).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaBeginEnrollOptionsScreen.useCurrentScreen).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useErrors).toBeDefined();
      expect(MfaBeginEnrollOptionsScreen.useAuth0Themes).toBeDefined();
    });
  });
});
