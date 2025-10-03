import { renderHook } from '@testing-library/react';
import * as MfaVoiceEnrollmentScreen from '../../src/screens/mfa-voice-enrollment';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-voice-enrollment', () => {
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

describe('MfaVoiceEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaVoiceEnrollmentScreen.useUser).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useClient).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaVoiceEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaVoiceEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });
});
