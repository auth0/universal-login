import { renderHook } from '@testing-library/react';
import * as PendingConsentScreen from '../../src/screens/pending-consent';
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
jest.mock('@auth0/auth0-acul-js/pending-consent', () => {
  return jest.fn().mockImplementation(() => {});
}, { virtual: true });

// Mock the instance store with a stub action method so submit functions can be
// invoked without throwing (the mocked PendingConsent class has no real methods)
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn(() => ({
    continue: jest.fn(() => Promise.resolve()),
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
    useExperiment: jest.fn(),
  })),
  useCurrentScreen: jest.fn(),
  useErrors: jest.fn(),
  useAuth0Themes: jest.fn(),
}));
// Mock utility hook: useMfaPolling, returning a stub polling control
jest.mock('../../src/hooks/utility/polling-manager', () => ({
  useMfaPolling: jest.fn(() => ({
    isRunning: false,
    startPolling: jest.fn(),
    stopPolling: jest.fn(),
  })),
}));

describe('PendingConsent Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(PendingConsentScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(PendingConsentScreen.useUser).toBeDefined();
      expect(PendingConsentScreen.useTenant).toBeDefined();
      expect(PendingConsentScreen.useBranding).toBeDefined();
      expect(PendingConsentScreen.useClient).toBeDefined();
      expect(PendingConsentScreen.useOrganization).toBeDefined();
      expect(PendingConsentScreen.usePrompt).toBeDefined();
      expect(PendingConsentScreen.useScreen).toBeDefined();
      expect(PendingConsentScreen.useTransaction).toBeDefined();
      expect(PendingConsentScreen.useUntrustedData).toBeDefined();
      expect(PendingConsentScreen.useExperiment).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(PendingConsentScreen.useCurrentScreen).toBeDefined();
      expect(PendingConsentScreen.useErrors).toBeDefined();
      expect(PendingConsentScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should categorize usePendingConsent as the only instance hook', () => {
      expect(exports.instanceHooks).toEqual(['usePendingConsent']);
    });

    it('should provide instance hook that returns screen instance', () => {
      // usePendingConsent() takes no parameters, so it should never throw here.
      exports.instanceHooks.forEach(hookName => {
        const { result } = renderHook(() => (PendingConsentScreen as any)[hookName]());
        expect(result.current).toBeDefined();
      });
    });

    it('should return stable reference across renders for instance hooks', () => {
      exports.instanceHooks.forEach(hookName => {
        const { result, rerender } = renderHook(() => (PendingConsentScreen as any)[hookName]());
        const firstResult = result.current;
        rerender();
        expect(result.current).toBe(firstResult);
      });
    });
  });

  describe('submit functions', () => {
    it('should categorize continueMethod as the only submit function', () => {
      expect(exports.submitFunctions).toEqual(['continueMethod']);
    });

    it('should export submit functions if available', () => {
      exports.submitFunctions.forEach(funcName => {
        expect(typeof (PendingConsentScreen as any)[funcName]).toBe('function');
      });
    });

    it('continueMethod forwards the payload to instance.continue', async () => {
      const { result } = renderHook(() => PendingConsentScreen.usePendingConsent());
      const promise = PendingConsentScreen.continueMethod({ foo: 'bar' });
      expect(promise).toBeInstanceOf(Promise);
      await promise;
      expect(result.current.continue).toHaveBeenCalledWith({ foo: 'bar' });
    });
  });

  describe('utility hooks', () => {
    it('should categorize useMfaPolling as the only utility hook', () => {
      expect(exports.utilityHooks).toEqual(['useMfaPolling']);
    });

    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (PendingConsentScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      // useMfaPolling() accepts optional options, so it should never throw here.
      exports.utilityHooks.forEach(hookName => {
        const { result } = renderHook(() => (PendingConsentScreen as any)[hookName]());
        expect(result.current).toBeDefined();
      });
    });
  });

  describe('submit functions coverage', () => {
    it('should call submit functions and return a promise', () => {
      // continueMethod accepts an optional payload, so calling it with {} should never throw.
      exports.submitFunctions.forEach(funcName => {
        const func = (PendingConsentScreen as any)[funcName];
        const result = func({});
        expect(result).toBeInstanceOf(Promise);
      });
    });
  });
});
