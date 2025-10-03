import { renderHook } from '@testing-library/react';
import * as RedeemTicketScreen from '../../src/screens/redeem-ticket';

// Mock the core SDK class
jest.mock('@auth0/auth0-acul-js/redeem-ticket', () => {
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

describe('RedeemTicket Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(RedeemTicketScreen.useUser).toBeDefined();
      expect(RedeemTicketScreen.useTenant).toBeDefined();
      expect(RedeemTicketScreen.useBranding).toBeDefined();
      expect(RedeemTicketScreen.useClient).toBeDefined();
      expect(RedeemTicketScreen.useOrganization).toBeDefined();
      expect(RedeemTicketScreen.usePrompt).toBeDefined();
      expect(RedeemTicketScreen.useScreen).toBeDefined();
      expect(RedeemTicketScreen.useTransaction).toBeDefined();
      expect(RedeemTicketScreen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(RedeemTicketScreen.useCurrentScreen).toBeDefined();
      expect(RedeemTicketScreen.useErrors).toBeDefined();
      expect(RedeemTicketScreen.useAuth0Themes).toBeDefined();
    });
  });
});
