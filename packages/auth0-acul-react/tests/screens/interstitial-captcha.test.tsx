import { renderHook } from '@testing-library/react';
import * as InterstitialCaptchaScreen from '../../src/screens/interstitial-captcha';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/interstitial-captcha', () => {
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

describe('InterstitialCaptcha Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(InterstitialCaptchaScreen.useUser).toBeDefined();
      expect(InterstitialCaptchaScreen.useTenant).toBeDefined();
      expect(InterstitialCaptchaScreen.useBranding).toBeDefined();
      expect(InterstitialCaptchaScreen.useClient).toBeDefined();
      expect(InterstitialCaptchaScreen.useOrganization).toBeDefined();
      expect(InterstitialCaptchaScreen.usePrompt).toBeDefined();
      expect(InterstitialCaptchaScreen.useScreen).toBeDefined();
      expect(InterstitialCaptchaScreen.useTransaction).toBeDefined();
      expect(InterstitialCaptchaScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(InterstitialCaptchaScreen.useCurrentScreen).toBeDefined();
      expect(InterstitialCaptchaScreen.useErrors).toBeDefined();
      expect(InterstitialCaptchaScreen.useAuth0Themes).toBeDefined();
    });
  });
});
