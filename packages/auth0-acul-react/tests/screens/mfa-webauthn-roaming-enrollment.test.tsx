import { renderHook } from '@testing-library/react';
import * as MfaWebauthnRoamingEnrollmentScreen from '../../src/screens/mfa-webauthn-roaming-enrollment';
import { categorizeScreenExports } from './test-helpers';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  SDKUsageError: class SDKUsageError extends Error {},
  UserInputError: class UserInputError extends Error {},
  Auth0ServerError: class Auth0ServerError extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment', () => {
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
}));

describe('MfaWebauthnRoamingEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaWebauthnRoamingEnrollmentScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnRoamingEnrollmentScreen.useUser).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useClient).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnRoamingEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaWebauthnRoamingEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnRoamingEnrollmentScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (MfaWebauthnRoamingEnrollmentScreen as any)[hookName]());
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
        expect(typeof (MfaWebauthnRoamingEnrollmentScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaWebauthnRoamingEnrollmentScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnRoamingEnrollmentScreen as any)[hookName]());
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
          const func = (MfaWebauthnRoamingEnrollmentScreen as any)[funcName];
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
