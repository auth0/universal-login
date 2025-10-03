import { renderHook } from '@testing-library/react';
import * as OrganizationPickerScreen from '../../src/screens/organization-picker';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/organization-picker', () => {
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

describe('OrganizationPicker Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(OrganizationPickerScreen.useUser).toBeDefined();
      expect(OrganizationPickerScreen.useTenant).toBeDefined();
      expect(OrganizationPickerScreen.useBranding).toBeDefined();
      expect(OrganizationPickerScreen.useClient).toBeDefined();
      expect(OrganizationPickerScreen.useOrganization).toBeDefined();
      expect(OrganizationPickerScreen.usePrompt).toBeDefined();
      expect(OrganizationPickerScreen.useScreen).toBeDefined();
      expect(OrganizationPickerScreen.useTransaction).toBeDefined();
      expect(OrganizationPickerScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(OrganizationPickerScreen.useCurrentScreen).toBeDefined();
      expect(OrganizationPickerScreen.useErrors).toBeDefined();
      expect(OrganizationPickerScreen.useAuth0Themes).toBeDefined();
    });
  });
});
