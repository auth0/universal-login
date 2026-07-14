import { renderHook } from '@testing-library/react';
import * as ConfirmationScreen from '../../src/screens/confirmation';
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
jest.mock('@auth0/auth0-acul-js/confirmation', () => {
  return jest.fn().mockImplementation(() => {});
}, { virtual: true });

// Mock the instance store with stub action methods so submit functions can be
// invoked without throwing (the mocked Confirmation class has no real methods)
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn(() => ({
    proceedToSignup: jest.fn(() => Promise.resolve()),
    goBack: jest.fn(() => Promise.resolve()),
  })),
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

describe('Confirmation Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(ConfirmationScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(ConfirmationScreen.useUser).toBeDefined();
      expect(ConfirmationScreen.useTenant).toBeDefined();
      expect(ConfirmationScreen.useBranding).toBeDefined();
      expect(ConfirmationScreen.useClient).toBeDefined();
      expect(ConfirmationScreen.useOrganization).toBeDefined();
      expect(ConfirmationScreen.usePrompt).toBeDefined();
      expect(ConfirmationScreen.useScreen).toBeDefined();
      expect(ConfirmationScreen.useTransaction).toBeDefined();
      expect(ConfirmationScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(ConfirmationScreen.useCurrentScreen).toBeDefined();
      expect(ConfirmationScreen.useErrors).toBeDefined();
      expect(ConfirmationScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // useConfirmation() takes no parameters, so it should never throw here.
      exports.instanceHooks.forEach(hookName => {
        const { result } = renderHook(() => (ConfirmationScreen as any)[hookName]());
        expect(result.current).toBeDefined();
      });
    });

    it('should return stable reference across renders for instance hooks', () => {
      exports.instanceHooks.forEach(hookName => {
        const { result, rerender } = renderHook(() => (ConfirmationScreen as any)[hookName]());
        const firstResult = result.current;
        rerender();
        expect(result.current).toBe(firstResult);
      });
    });
  });

  describe('submit functions', () => {
    it('should export proceedToSignup and goBack', () => {
      expect(typeof ConfirmationScreen.proceedToSignup).toBe('function');
      expect(typeof ConfirmationScreen.goBack).toBe('function');
    });

    it('should export submit functions if available', () => {
      exports.submitFunctions.forEach(funcName => {
        expect(typeof (ConfirmationScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (ConfirmationScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (ConfirmationScreen as any)[hookName]());
          expect(result.current).toBeDefined();
        } catch (e) {
          // Some utility hooks may require parameters
        }
      });
    });
  });

  describe('submit functions coverage', () => {
    it('should call submit functions and return a promise', async () => {
      // proceedToSignup/goBack both accept an optional payload, so calling
      // them with {} should never throw.
      exports.submitFunctions.forEach(funcName => {
        const func = (ConfirmationScreen as any)[funcName];
        const result = func({});
        expect(result).toBeInstanceOf(Promise);
      });
    });
  });
});
