import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/customized-consent/screen-override';
import { getScopes } from '../../../../src/shared/screen';

import type { Scope, AuthorizationDetail, ScreenContext } from '../../../../interfaces/models/screen';

// Mock the shared getScopes utility
jest.mock('../../../../src/shared/screen', () => ({
  ...jest.requireActual('../../../../src/shared/screen'), // Import and retain default behavior
  getScopes: jest.fn(),
}));

describe('CustomizedConsent ScreenOverride', () => {
  const mockValidScopes: Scope[] = [
    { name: 'openid', description: 'Sign in', values: [] },
    { name: 'profile', description: 'View your profile information', values: ['name', 'picture'] },
  ];

  const mockValidAuthorizationDetails: AuthorizationDetail[] = [
    { type: 'payment', amount: '10.00', currency: 'USD' },
    { type: 'file_access', file_id: 'doc123', permission: 'read' },
  ];

  beforeEach(() => {
    (getScopes as jest.Mock).mockReturnValue(mockValidScopes); // Default mock for getScopes
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        scopes: mockValidScopes,
        authorization_details: mockValidAuthorizationDetails,
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
    expect(screenOverride.scopes).toEqual(mockValidScopes);
    expect(screenOverride.authorizationDetails).toEqual(mockValidAuthorizationDetails);
    expect(getScopes).toHaveBeenCalledWith(screenContext);
  });

  it('should initialize with empty scopes if screenContext.data.scopes is missing or invalid', () => {
    (getScopes as jest.Mock).mockReturnValue([]); // Simulate getScopes returning empty for this test
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        authorization_details: mockValidAuthorizationDetails,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.scopes).toEqual([]);
    expect(getScopes).toHaveBeenCalledWith(screenContext);
  });

  it('should initialize with empty authorizationDetails if screenContext.data.authorization_details is missing', () => {
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        scopes: mockValidScopes,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.authorizationDetails).toEqual([]);
  });

  it('should initialize with empty authorizationDetails if screenContext.data.authorization_details is not an array', () => {
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        scopes: mockValidScopes,
        authorization_details: 'not-an-array' as any,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.authorizationDetails).toEqual([]);
  });

  it('should filter out malformed authorizationDetails (missing type)', () => {
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        scopes: mockValidScopes,
        authorization_details: [
          { type: 'payment', amount: '10.00' }, // valid
          { amount: '5.00', currency: 'EUR' }, // invalid, missing type
          { type: 'file', file_id: 'f001' }, // valid
        ] as any[],
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.authorizationDetails).toEqual([
      { type: 'payment', amount: '10.00' },
      { type: 'file', file_id: 'f001' },
    ]);
  });

   it('should filter out authorizationDetails properties that are not strings', () => {
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {
        scopes: mockValidScopes,
        authorization_details: [
          { type: 'payment', amount: '10.00', count: 1 }, // count is not a string
          { type: 'file', file_id: 'f001', valid: true }, // valid is not a string
        ] as any[],
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.authorizationDetails).toEqual([
      { type: 'payment', amount: '10.00' },
      { type: 'file', file_id: 'f001' },
    ]);
  });

  it('should handle empty screenContext.data gracefully', () => {
    (getScopes as jest.Mock).mockReturnValue([]);
    const screenContext: ScreenContext = {
      name: 'customized-consent',
      data: {},
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.scopes).toEqual([]);
    expect(screenOverride.authorizationDetails).toEqual([]);
    expect(getScopes).toHaveBeenCalledWith(screenContext);
  });

  it('should handle undefined screenContext.data gracefully', () => {
    (getScopes as jest.Mock).mockReturnValue([]);
    const screenContext: ScreenContext = {
      name: 'customized-consent',
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.scopes).toEqual([]);
    expect(screenOverride.authorizationDetails).toEqual([]);
    expect(getScopes).toHaveBeenCalledWith(screenContext);
  });

  // Static method tests
  describe('static getScopes', () => {
    it('should call the shared getScopes utility', () => {
      const screenContext: ScreenContext = {
        name: 'customized-consent',
        data: { scopes: mockValidScopes },
      } as ScreenContext;
      ScreenOverride.getScopes(screenContext);
      expect(getScopes).toHaveBeenCalledWith(screenContext);
    });
  });

  describe('static getAuthorizationDetails', () => {
    it('should extract and sanitize authorization_details correctly', () => {
      const screenContext: ScreenContext = {
        name: 'customized-consent',
        data: {
          authorization_details: [
            { type: 'payment', amount: '10.00', currency: 'USD', count: 1 }, // count will be filtered
            { type: 'file_access', file_id: 'doc123', permission: 'read', valid: true }, // valid will be filtered
            { amount: '5.00' }, // missing type, will be filtered
          ] as any[],
        },
      } as ScreenContext;
      const details = ScreenOverride.getAuthorizationDetails(screenContext);
      expect(details).toEqual([
        { type: 'payment', amount: '10.00', currency: 'USD' },
        { type: 'file_access', file_id: 'doc123', permission: 'read' },
      ]);
    });

    it('should return empty array if authorization_details is not an array', () => {
      const screenContext: ScreenContext = {
        name: 'customized-consent',
        data: { authorization_details: 'not-an-array' as any },
      } as ScreenContext;
      expect(ScreenOverride.getAuthorizationDetails(screenContext)).toEqual([]);
    });

    it('should return empty array if data is missing', () => {
      const screenContext: ScreenContext = { name: 'customized-consent' } as ScreenContext;
      expect(ScreenOverride.getAuthorizationDetails(screenContext)).toEqual([]);
    });
  });
});