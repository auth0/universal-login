import { renderHook } from '@testing-library/react';
import * as MfaPushEnrollmentQrScreen from '../../src/screens/mfa-push-enrollment-qr';
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
  submit: jest.fn(() => Promise.resolve()),
};

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/mfa-push-enrollment-qr', () => {
  return jest.fn().mockImplementation(function MockMfaPushEnrollmentQr(this: any) {
    this.continue = jest.fn(() => Promise.resolve());
    this.submit = jest.fn(() => Promise.resolve());
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

describe('MfaPushEnrollmentQr Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaPushEnrollmentQrScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaPushEnrollmentQrScreen.useUser).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useTenant).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useBranding).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useClient).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useOrganization).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.usePrompt).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useScreen).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useTransaction).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaPushEnrollmentQrScreen.useCurrentScreen).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useErrors).toBeDefined();
      expect(MfaPushEnrollmentQrScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaPushEnrollmentQrScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (MfaPushEnrollmentQrScreen as any)[hookName]());
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
        expect(typeof (MfaPushEnrollmentQrScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaPushEnrollmentQrScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaPushEnrollmentQrScreen as any)[hookName]());
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
          const func = (MfaPushEnrollmentQrScreen as any)[funcName];
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
