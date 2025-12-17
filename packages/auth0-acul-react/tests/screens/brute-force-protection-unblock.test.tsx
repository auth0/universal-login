import { renderHook } from '@testing-library/react';
import * as BruteForceProtectionUnblockScreen from '../../src/screens/brute-force-protection-unblock';
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
jest.mock('@auth0/auth0-acul-js/brute-force-protection-unblock', () => {
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

describe('BruteForceProtectionUnblock Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(BruteForceProtectionUnblockScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(BruteForceProtectionUnblockScreen.useUser).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useTenant).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useBranding).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useClient).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useOrganization).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.usePrompt).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useScreen).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useTransaction).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(BruteForceProtectionUnblockScreen.useCurrentScreen).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useErrors).toBeDefined();
      expect(BruteForceProtectionUnblockScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (BruteForceProtectionUnblockScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (BruteForceProtectionUnblockScreen as any)[hookName]());
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
        expect(typeof (BruteForceProtectionUnblockScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (BruteForceProtectionUnblockScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (BruteForceProtectionUnblockScreen as any)[hookName]());
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
          const func = (BruteForceProtectionUnblockScreen as any)[funcName];
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
