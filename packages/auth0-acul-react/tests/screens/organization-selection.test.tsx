import { renderHook } from '@testing-library/react';
import * as OrganizationSelectionScreen from '../../src/screens/organization-selection';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/organization-selection', () => {
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

describe('OrganizationSelection Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(OrganizationSelectionScreen.useUser).toBeDefined();
      expect(OrganizationSelectionScreen.useTenant).toBeDefined();
      expect(OrganizationSelectionScreen.useBranding).toBeDefined();
      expect(OrganizationSelectionScreen.useClient).toBeDefined();
      expect(OrganizationSelectionScreen.useOrganization).toBeDefined();
      expect(OrganizationSelectionScreen.usePrompt).toBeDefined();
      expect(OrganizationSelectionScreen.useScreen).toBeDefined();
      expect(OrganizationSelectionScreen.useTransaction).toBeDefined();
      expect(OrganizationSelectionScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(OrganizationSelectionScreen.useCurrentScreen).toBeDefined();
      expect(OrganizationSelectionScreen.useErrors).toBeDefined();
      expect(OrganizationSelectionScreen.useAuth0Themes).toBeDefined();
    });
  });
});
