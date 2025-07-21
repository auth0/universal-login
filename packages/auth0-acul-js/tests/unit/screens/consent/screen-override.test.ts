import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/consent/screen-override';
import { getScopes } from '../../../../src/shared/screen';

import type { Scope, ScreenContext } from '../../../../interfaces/models/screen';

// Mock the shared screen utility
jest.mock('../../../../src/shared/screen');

/**
 * @group unit
 * @group screens
 */
describe('Consent ScreenOverride', () => {
  const validScopes: Scope[] = [
    { value: 'openid', description: 'Sign in' },
    { value: 'profile', description: 'View your profile information' },
    { value: 'email', description: 'View your email address' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    (getScopes as jest.Mock).mockReset();
    (getScopes as jest.Mock).mockReturnValue(validScopes);
  });

  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'consent',
      data: {
        scopes: validScopes,
        hideScopes: false,
        extra_data: 'should_be_ignored',
      },
    } as ScreenContext; // Cast for test purposes

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen);
    expect(screenOverride.scopes).toEqual(validScopes);
    expect(screenOverride.hideScopes).toBe(false);
    expect(getScopes).toHaveBeenCalledWith(screenContext);
  });

  it('should handle hideScopes: true correctly', () => {
    const screenContext: ScreenContext = {
      name: 'consent',
      data: {
        scopes: [], // Can be empty if hidden
        hideScopes: true,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.hideScopes).toBe(true);
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = { name: 'consent', data: undefined } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.hideScopes).toBe(false); // Should default to false if data is missing
  });

  describe('static getScopes method', () => {
    it('should call the shared getScopes utility', () => {
      const screenContext: ScreenContext = {
        name: 'consent',
        data: { scopes: validScopes, hideScopes: true },
      } as ScreenContext;
      
      ScreenOverride.getScopes(screenContext);
      expect(getScopes).toHaveBeenCalledWith(screenContext);
    });
  });

  describe('static getHideScopes method', () => {
    it('should return true when hideScopes is true', () => {
      const screenContext: ScreenContext = {
        name: 'consent',
        data: { hideScopes: true },
      } as ScreenContext;
      
      const result = ScreenOverride.getHideScopes(screenContext);
      expect(result).toBe(true);
    });

    it('should return false when hideScopes is false', () => {
      const screenContext: ScreenContext = {
        name: 'consent',
        data: { hideScopes: false },
      } as ScreenContext;
      
      const result = ScreenOverride.getHideScopes(screenContext);
      expect(result).toBe(false);
    });

    it('should return false when hideScopes is missing', () => {
      const screenContext: ScreenContext = {
        name: 'consent',
        data: {},
      } as ScreenContext;
      
      const result = ScreenOverride.getHideScopes(screenContext);
      expect(result).toBe(false);
    });

    it('should return false when data is missing', () => {
      const screenContext: ScreenContext = {
        name: 'consent',
      } as ScreenContext;
      
      const result = ScreenOverride.getHideScopes(screenContext);
      expect(result).toBe(false);
    });
  });
});