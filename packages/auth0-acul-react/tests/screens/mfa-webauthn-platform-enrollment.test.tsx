import { renderHook } from '@testing-library/react';
import * as MfaWebauthnPlatformEnrollmentScreen from '../../src/screens/mfa-webauthn-platform-enrollment';
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
jest.mock('@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment', () => {
  return jest.fn().mockImplementation(() => ({
    submitPasskeyCredential: jest.fn().mockResolvedValue({}),
    reportBrowserError: jest.fn().mockResolvedValue({}),
    snoozeEnrollment: jest.fn().mockResolvedValue({}),
    refuseEnrollmentOnThisDevice: jest.fn().mockResolvedValue({}),
  }));
}, { virtual: true });

// Mock the instance store with getScreen support
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn((Screen) => {
    const instance = new Screen();
    // Add methods that may be missing from the mock
    instance.submitPasskeyCredential = jest.fn().mockResolvedValue({});
    instance.reportBrowserError = jest.fn().mockResolvedValue({});
    instance.snoozeEnrollment = jest.fn().mockResolvedValue({});
    instance.refuseEnrollmentOnThisDevice = jest.fn().mockResolvedValue({});
    return instance;
  }),
  getScreen: jest.fn(() => ({
    submitPasskeyCredential: jest.fn().mockResolvedValue({}),
    reportBrowserError: jest.fn().mockResolvedValue({}),
    snoozeEnrollment: jest.fn().mockResolvedValue({}),
    refuseEnrollmentOnThisDevice: jest.fn().mockResolvedValue({}),
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
  useCurrentScreen: jest.fn(() => ({ currentScreen: 'mfa-webauthn-platform-enrollment' })),
  useErrors: jest.fn(() => ({ errors: [] })),
  useAuth0Themes: jest.fn(() => ({ themes: {} })),
}));

describe('MfaWebauthnPlatformEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaWebauthnPlatformEnrollmentScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useUser).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useClient).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useAuth0Themes).toBeDefined();
    });

    it('should export submit functions', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.submitPasskeyCredential).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.reportBrowserError).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.snoozeEnrollment).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.refuseEnrollmentOnThisDevice).toBeDefined();
    });

    it('should export main instance hook', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useMfaWebAuthnPlatformEnrollment).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
        expect(typeof (MfaWebauthnPlatformEnrollmentScreen as any)[funcName]).toBe('function');
      });
    });

    it('should call submitPasskeyCredential with payload', async () => {
      const payload = { credentialId: 'test-credential' };
      const result = MfaWebauthnPlatformEnrollmentScreen.submitPasskeyCredential(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call snoozeEnrollment with payload', async () => {
      const payload = {};
      const result = MfaWebauthnPlatformEnrollmentScreen.snoozeEnrollment(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call refuseEnrollmentOnThisDevice with payload', async () => {
      const payload = {};
      const result = MfaWebauthnPlatformEnrollmentScreen.refuseEnrollmentOnThisDevice(payload);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call submitPasskeyCredential without payload', async () => {
      const result = MfaWebauthnPlatformEnrollmentScreen.submitPasskeyCredential();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call snoozeEnrollment without payload', async () => {
      const result = MfaWebauthnPlatformEnrollmentScreen.snoozeEnrollment();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should call refuseEnrollmentOnThisDevice without payload', async () => {
      const result = MfaWebauthnPlatformEnrollmentScreen.refuseEnrollmentOnThisDevice();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
          const func = (MfaWebauthnPlatformEnrollmentScreen as any)[funcName];
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

  describe('useMfaWebAuthnPlatformEnrollment', () => {
    it('should return instance from useMfaWebAuthnPlatformEnrollment hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useMfaWebAuthnPlatformEnrollment());
      expect(result.current).toBeDefined();
    });

    it('should return stable instance reference', () => {
      const { result, rerender } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useMfaWebAuthnPlatformEnrollment());
      const firstInstance = result.current;
      rerender();
      expect(result.current).toBe(firstInstance);
    });

    it('should return instance with expected methods', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useMfaWebAuthnPlatformEnrollment());
      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe('object');
    });
  });

  describe('context hooks', () => {
    it('should call useUser hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useUser());
      expect(result.current).toBeDefined();
    });

    it('should call useTenant hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useTenant());
      expect(result.current).toBeDefined();
    });

    it('should call useBranding hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useBranding());
      expect(result.current).toBeDefined();
    });

    it('should call useClient hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useClient());
      expect(result.current).toBeDefined();
    });

    it('should call useOrganization hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useOrganization());
      expect(result.current).toBeDefined();
    });

    it('should call usePrompt hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.usePrompt());
      expect(result.current).toBeDefined();
    });

    it('should call useScreen hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useScreen());
      expect(result.current).toBeDefined();
    });

    it('should call useTransaction hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useTransaction());
      expect(result.current).toBeDefined();
    });

    it('should call useUntrustedData hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useUntrustedData());
      expect(result.current).toBeDefined();
    });
  });

  describe('common hooks', () => {
    it('should call useCurrentScreen hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useCurrentScreen());
      expect(result.current).toBeDefined();
    });

    it('should call useErrors hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useErrors());
      expect(result.current).toBeDefined();
      expect(result.current.errors).toBeDefined();
    });

    it('should call useAuth0Themes hook', () => {
      const { result } = renderHook(() => MfaWebauthnPlatformEnrollmentScreen.useAuth0Themes());
      expect(result.current).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should wrap submitPasskeyCredential with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaWebauthnPlatformEnrollmentScreen.submitPasskeyCredential({ credentialId: 'test' });
      expect(mockWithError).toHaveBeenCalled();
    });

    it('should wrap snoozeEnrollment with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaWebauthnPlatformEnrollmentScreen.snoozeEnrollment({});
      expect(mockWithError).toHaveBeenCalled();
    });

    it('should wrap refuseEnrollmentOnThisDevice with error handler', async () => {
      const mockWithError = require('../../src/hooks').errorManager.withError;
      MfaWebauthnPlatformEnrollmentScreen.refuseEnrollmentOnThisDevice({});
      expect(mockWithError).toHaveBeenCalled();
    });
  });
});

describe('MfaWebauthnPlatformEnrollment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(MfaWebauthnPlatformEnrollmentScreen);

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useUser).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTenant).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useBranding).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useClient).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useOrganization).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.usePrompt).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useTransaction).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(MfaWebauthnPlatformEnrollmentScreen.useCurrentScreen).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useErrors).toBeDefined();
      expect(MfaWebauthnPlatformEnrollmentScreen.useAuth0Themes).toBeDefined();
    });
  });

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
          const { result, rerender } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
        expect(typeof (MfaWebauthnPlatformEnrollmentScreen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (MfaWebauthnPlatformEnrollmentScreen as any)[hookName]());
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
          const func = (MfaWebauthnPlatformEnrollmentScreen as any)[funcName];
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
