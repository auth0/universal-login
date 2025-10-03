import { renderHook } from '@testing-library/react';
import * as MfaWebauthnChangeKeyNicknameScreen from '../../src/screens/mfa-webauthn-change-key-nickname';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname', () => {
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

describe('MfaWebauthnChangeKeyNickname Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnChangeKeyNicknameScreen.useUser).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useTenant).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useBranding).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useClient).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useScreen).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnChangeKeyNicknameScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useErrors).toBeDefined();
      expect(MfaWebauthnChangeKeyNicknameScreen.useAuth0Themes).toBeDefined();
    });
  });
});
