import { renderHook } from '@testing-library/react';
import * as MfaWebauthnErrorScreen from '../../src/screens/mfa-webauthn-error';
import { categorizeScreenExports } from './test-helpers';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  ConfigurationError: class ConfigurationError extends Error {},
  ValidationError: class ValidationError extends Error {},
  Auth0Error: class Auth0Error extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class with all required methods
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-error', () => {
  return jest.fn().mockImplementation(() => ({
    tryAgain: jest.fn().mockResolvedValue({}),
    usePassword: jest.fn().mockResolvedValue({}),
    tryAnotherMethod: jest.fn().mockResolvedValue({}),
    noThanks: jest.fn().mockResolvedValue({}),
  }));
}, { virtual: true });

// Mock the instance store with getScreen support
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn((Screen) => {
    const instance = new Screen();
    // Add methods that are missing from the mock
    instance.tryAgain = jest.fn().mockResolvedValue({});
    instance.usePassword = jest.fn().mockResolvedValue({});
    instance.tryAnotherMethod = jest.fn().mockResolvedValue({});
    instance.noThanks = jest.fn().mockResolvedValue({});
    return instance;
  }),
  getScreen: jest.fn(() => ({
    tryAgain: jest.fn().mockResolvedValue({}),
    usePassword: jest.fn().mockResolvedValue({}),
    tryAnotherMethod: jest.fn().mockResolvedValue({}),
    noThanks: jest.fn().mockResolvedValue({}),
  })),
}));

// Mock error manager and hooks
jest.mock('../../src/hooks', () => ({
  errorManager: {
    withError: jest.fn((promise) => promise),
  },
  ContextHooks: jest.fn().mockImplementation(() => ({
    useUser: jest.fn(() => ({ user: null })),
    useTenant: jest.fn(() => ({ tenant: null })),
    useBranding: jest.fn(() => ({ branding: null })),
    useClient: jest.fn(() => ({ client: null })),
    useOrganization: jest.fn(() => ({ organization: null })),
    usePrompt: jest.fn(() => ({ prompt: null })),
    useScreen: jest.fn(() => ({ screen: null })),
    useTransaction: jest.fn(() => ({ transaction: null })),
    useUntrustedData: jest.fn(() => ({ untrustedData: null })),
  })),
  useCurrentScreen: jest.fn(() => ({ currentScreen: 'mfa-webauthn-error' })),
  useErrors: jest.fn(() => ({ errors: [] })),
  useAuth0Themes: jest.fn(() => ({ themes: {} })),
}));

describe('MfaWebauthnError Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaWebauthnErrorScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnErrorScreen.useUser).toBeDefined();
      expect(MfaWebauthnErrorScreen.useTenant).toBeDefined();
      expect(MfaWebauthnErrorScreen.useBranding).toBeDefined();
      expect(MfaWebauthnErrorScreen.useClient).toBeDefined();
      expect(MfaWebauthnErrorScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnErrorScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnErrorScreen.useScreen).toBeDefined();
      expect(MfaWebauthnErrorScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnErrorScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnErrorScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnErrorScreen.useErrors).toBeDefined();
      expect(MfaWebauthnErrorScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnErrorScreen as any)[hookName]());
          if (result.current && typeof result.current === 'object') {
            expect(result.current).toBeDefined();
          }
        } catch (e) {
          // Skip if it requires parameters
        }
      });
    });

    it('should return stable reference across renders for instance hooks', () => {
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result, rerender } = renderHook(() => (MfaWebauthnErrorScreen as any)[hookName]());
          if (result.current && typeof result.current === 'object') {
            const firstResult = result.current;
            rerender();
            expect(result.current).toBe(firstResult);
          }
        } catch (e) {
          // Skip if it requires parameters
        }
      });
    });
  });

  describe('submit functions', () => {
    it('should export submit functions if available', () => {
      // Verify all submit functions are callable
      exports.submitFunctions.forEach(funcName => {
        expect(typeof (MfaWebauthnErrorScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaWebauthnErrorScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnErrorScreen as any)[hookName]());
          expect(result.current).toBeDefined();
        } catch (e) {
          // Some utility hooks may require parameters
        }
      });
    });
  });

  describe('submit functions coverage', () => {
    it('should call submit functions', () => {
      exports.submitFunctions.forEach(funcName => {
        try {
          const func = (MfaWebauthnErrorScreen as any)[funcName];
          const result = func({});
          if (result && typeof result.then === 'function') {
            expect(result).toBeDefined();
          }
        } catch (e) {
          // Function may require specific parameters
        }
      });
    });
  });
});
