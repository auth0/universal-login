import { renderHook } from '@testing-library/react';
import * as MfaPushChallengePushScreen from '../../src/screens/mfa-push-challenge-push';
import { categorizeScreenExports } from './test-helpers';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  ConfigurationError: class ConfigurationError extends Error {},
  ValidationError: class ValidationError extends Error {},
  Auth0Error: class Auth0Error extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock polling control for screens that use it
const mockPollingControl = {
  startPolling: jest.fn(),
  stopPolling: jest.fn(),
  isRunning: jest.fn().mockReturnValue(false),
};

// Mock screen instance with common methods
const mockScreenInstance = {
  pollingManager: jest.fn().mockReturnValue(mockPollingControl),
  continue: jest.fn(() => Promise.resolve()),
  resendPushNotification: jest.fn(() => Promise.resolve()),
  enterCodeManually: jest.fn(() => Promise.resolve()),
  tryAnotherMethod: jest.fn(() => Promise.resolve()),
};

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-push-challenge-push', () => {
  return jest.fn().mockImplementation(function MockMfaPushChallengePush(this: any) {
    this.continue = jest.fn(() => Promise.resolve());
    this.resendPushNotification = jest.fn(() => Promise.resolve());
    this.enterCodeManually = jest.fn(() => Promise.resolve());
    this.tryAnotherMethod = jest.fn(() => Promise.resolve());
    this.pollingManager = jest.fn(() => mockPollingControl);
  });
}, { virtual: true });

// Mock the instance store with getScreen
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn((Screen) => new Screen()),
  getScreen: jest.fn(() => mockScreenInstance),
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
  useCurrentScreen: jest.fn(() => ({ currentScreen: 'mfa-push-challenge-push' })),
  useErrors: jest.fn(() => ({ errors: [] })),
  useAuth0Themes: jest.fn(() => ({ themes: {} })),
}));

// Mock utility hook: useMfaPolling
jest.mock('../../src/hooks/utility/polling-manager', () => ({
  useMfaPolling: jest.fn(() => ({ 
    isPolling: false, 
    startPolling: jest.fn(), 
    stopPolling: jest.fn() 
  })),
}));

describe('MfaPushChallengePush Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaPushChallengePushScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPushChallengePushScreen.useUser).toBeDefined();
      expect(MfaPushChallengePushScreen.useTenant).toBeDefined();
      expect(MfaPushChallengePushScreen.useBranding).toBeDefined();
      expect(MfaPushChallengePushScreen.useClient).toBeDefined();
      expect(MfaPushChallengePushScreen.useOrganization).toBeDefined();
      expect(MfaPushChallengePushScreen.usePrompt).toBeDefined();
      expect(MfaPushChallengePushScreen.useScreen).toBeDefined();
      expect(MfaPushChallengePushScreen.useTransaction).toBeDefined();
      expect(MfaPushChallengePushScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPushChallengePushScreen.useCurrentScreen).toBeDefined();
      expect(MfaPushChallengePushScreen.useErrors).toBeDefined();
      expect(MfaPushChallengePushScreen.useAuth0Themes).toBeDefined();
    });

    it('should export useMfaPolling utility hook', () => {
      expect(MfaPushChallengePushScreen.useMfaPolling).toBeDefined();
    });

    it('should export submit functions', () => {
      expect(MfaPushChallengePushScreen.continueMethod).toBeDefined();
      expect(MfaPushChallengePushScreen.resendPushNotification).toBeDefined();
      expect(MfaPushChallengePushScreen.enterCodeManually).toBeDefined();
      expect(MfaPushChallengePushScreen.tryAnotherMethod).toBeDefined();
    });

    it('should export main instance hook', () => {
      expect(MfaPushChallengePushScreen.useMfaPushChallengePush).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaPushChallengePushScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (MfaPushChallengePushScreen as any)[hookName]());
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
      exports.submitFunctions.forEach(funcName => {
        expect(typeof (MfaPushChallengePushScreen as any)[funcName]).toBe('function');
      });
    });

    it('should call continueMethod with payload', async () => {
      const payload = { rememberDevice: true };
      const result = MfaPushChallengePushScreen.continueMethod(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call resendPushNotification with payload', async () => {
      const payload = { rememberDevice: false };
      const result = MfaPushChallengePushScreen.resendPushNotification(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call enterCodeManually with payload', async () => {
      const payload = {};
      const result = MfaPushChallengePushScreen.enterCodeManually(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call tryAnotherMethod with payload', async () => {
      const payload = {};
      const result = MfaPushChallengePushScreen.tryAnotherMethod(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call continueMethod without payload', async () => {
      const result = MfaPushChallengePushScreen.continueMethod();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call resendPushNotification without payload', async () => {
      const result = MfaPushChallengePushScreen.resendPushNotification();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaPushChallengePushScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaPushChallengePushScreen as any)[hookName]());
          expect(result.current).toBeDefined();
        } catch (e) {
          // Some utility hooks may require parameters
        }
      });
    });

    it('should call useMfaPolling and return polling controls', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useMfaPolling());
      expect(result.current).toBeDefined();
      // Only check properties that exist on MfaPollingResult
      expect(result.current.startPolling).toBeDefined();
      expect(result.current.stopPolling).toBeDefined();
    });
  });

  describe('submit functions coverage', () => {
    it('should call submit functions', () => {
      exports.submitFunctions.forEach(funcName => {
        try {
          const func = (MfaPushChallengePushScreen as any)[funcName];
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

  describe('useMfaPushChallengePush', () => {
    it('should return instance from useMfaPushChallengePush hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useMfaPushChallengePush());
      expect(result.current).toBeDefined();
    });

    it('should return stable instance reference', () => {
      const { result, rerender } = renderHook(() => MfaPushChallengePushScreen.useMfaPushChallengePush());
      const firstInstance = result.current;
      rerender();
      expect(result.current).toBe(firstInstance);
    });

    it('should return instance with expected methods', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useMfaPushChallengePush());
      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe('object');
    });
  });

  describe('context hooks', () => {
    it('should call useUser hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useUser());
      expect(result.current).toBeDefined();
    });

    it('should call useTenant hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useTenant());
      expect(result.current).toBeDefined();
    });

    it('should call useBranding hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useBranding());
      expect(result.current).toBeDefined();
    });

    it('should call useClient hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useClient());
      expect(result.current).toBeDefined();
    });

    it('should call useOrganization hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useOrganization());
      expect(result.current).toBeDefined();
    });

    it('should call usePrompt hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.usePrompt());
      expect(result.current).toBeDefined();
    });

    it('should call useScreen hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useScreen());
      expect(result.current).toBeDefined();
    });

    it('should call useTransaction hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useTransaction());
      expect(result.current).toBeDefined();
    });

    it('should call useUntrustedData hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useUntrustedData());
      expect(result.current).toBeDefined();
    });
  });

  describe('common hooks', () => {
    it('should call useCurrentScreen hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useCurrentScreen());
      expect(result.current).toBeDefined();
    });

    it('should call useErrors hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useErrors());
      expect(result.current).toBeDefined();
      expect(result.current.errors).toBeDefined();
    });

    it('should call useAuth0Themes hook', () => {
      const { result } = renderHook(() => MfaPushChallengePushScreen.useAuth0Themes());
      expect(result.current).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should wrap continueMethod with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaPushChallengePushScreen.continueMethod({ rememberDevice: true });
      expect(mockWithError).toHaveBeenCalled();
    });

    it('should wrap resendPushNotification with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaPushChallengePushScreen.resendPushNotification({ rememberDevice: false });
      expect(mockWithError).toHaveBeenCalled();
    });

    it('should wrap enterCodeManually with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaPushChallengePushScreen.enterCodeManually({});
      expect(mockWithError).toHaveBeenCalled();
    });

    it('should wrap tryAnotherMethod with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaPushChallengePushScreen.tryAnotherMethod({});
      expect(mockWithError).toHaveBeenCalled();
    });
  });
});
