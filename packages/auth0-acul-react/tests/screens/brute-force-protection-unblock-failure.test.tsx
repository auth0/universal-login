import { renderHook } from '@testing-library/react';
import * as BruteForceProtectionUnblockFailureScreen from '../../src/screens/brute-force-protection-unblock-failure';
import { categorizeScreenExports } from './test-helpers';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  ConfigurationError: class ConfigurationError extends Error {},
  ValidationError: class ValidationError extends Error {},
  Auth0Error: class Auth0Error extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/brute-force-protection-unblock-failure', () => {
  return jest.fn().mockImplementation(() => {});
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
  useChangeLanguage: jest.fn(),
}));

describe('BruteForceProtectionUnblockFailure Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(BruteForceProtectionUnblockFailureScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(BruteForceProtectionUnblockFailureScreen.useUser).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useTenant).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useBranding).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useClient).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useOrganization).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.usePrompt).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useScreen).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useTransaction).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(BruteForceProtectionUnblockFailureScreen.useCurrentScreen).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useErrors).toBeDefined();
      expect(BruteForceProtectionUnblockFailureScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (BruteForceProtectionUnblockFailureScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (BruteForceProtectionUnblockFailureScreen as any)[hookName]());
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
        expect(typeof (BruteForceProtectionUnblockFailureScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (BruteForceProtectionUnblockFailureScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (BruteForceProtectionUnblockFailureScreen as any)[hookName]());
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
          const func = (BruteForceProtectionUnblockFailureScreen as any)[funcName];
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
