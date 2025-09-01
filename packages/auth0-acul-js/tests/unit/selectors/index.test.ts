/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { BaseContext } from '../../../src/models/base-context';
import { getCurrentScreen, getCurrentScreenOptions, getCurrentThemeOptions, getErrors } from '../../../src/selectors';

// Mock the BaseContext
jest.mock('../../../src/models/base-context');

// Mock the Branding class
jest.mock('../../../src/models/branding', () => ({
  Branding: {
    getSettings: jest.fn(),
    getThemes: jest.fn()
  }
}));

// Mock theme utilities
jest.mock('../../../src/utils/theme-utils', () => ({
  flattenColors: jest.fn(),
  flattenFonts: jest.fn(),
  flattenBorders: jest.fn(),
  flattenPageBackground: jest.fn(),
  flattenWidget: jest.fn()
}));

describe('Selectors', () => {
  let mockBaseContext: jest.Mocked<BaseContext>;
  let mockGetContext: jest.MockedFunction<BaseContext['getContext']>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create mock instance
    mockGetContext = jest.fn();
    mockBaseContext = {
      getContext: mockGetContext,
    } as jest.Mocked<BaseContext>;

    // Mock the BaseContext constructor to return our mock instance
    (BaseContext as jest.MockedClass<typeof BaseContext>).mockImplementation(() => mockBaseContext);
  });

  describe('getCurrentScreen', () => {
    it('should return the current screen name when screen context exists', () => {
      const mockScreen = { name: 'login' };
      mockGetContext.mockReturnValue(mockScreen);

      const result = getCurrentScreen();

      expect(mockGetContext).toHaveBeenCalledWith('screen');
      expect(result).toBe('login');
    });

    it('should return null when screen context is null', () => {
      mockGetContext.mockReturnValue(undefined);

      const result = getCurrentScreen();

      expect(mockGetContext).toHaveBeenCalledWith('screen');
      expect(result).toBeNull();
    });

    it('should return null when screen context is undefined', () => {
      mockGetContext.mockReturnValue(undefined);

      const result = getCurrentScreen();

      expect(mockGetContext).toHaveBeenCalledWith('screen');
      expect(result).toBeNull();
    });

    it('should return null when screen context exists but name is undefined', () => {
      const mockScreen = {};
      mockGetContext.mockReturnValue(mockScreen);

      const result = getCurrentScreen();

      expect(mockGetContext).toHaveBeenCalledWith('screen');
      expect(result).toBeNull();
    });
  });

  describe('getCurrentScreenOptions', () => {
    it('should return complete screen options when all contexts exist', () => {
      const mockContexts: Record<string, any> = {
        client: { id: 'client123', metadata: { custom: 'value' } },
        organization: { id: 'org456', metadata: { name: 'Test Org' } },
        prompt: { name: 'login' },
        screen: { name: 'login-password' },
        tenant: { enabled_locales: ['en', 'es'] },
        transaction: { 
          errors: [{ code: 'invalid_password', description: 'Invalid password', message: 'Invalid password provided' }], 
          state: 'active', 
          locale: 'en' 
        },
        untrusted_data: { authorization_params: { scope: 'openid profile' } }
      };

      mockGetContext.mockImplementation((key: string) => mockContexts[key]);

      const result = getCurrentScreenOptions();

      expect(result).toEqual({
        client: { id: 'client123', metadata: { custom: 'value' } },
        organization: { id: 'org456', metadata: { name: 'Test Org' } },
        prompt: { name: 'login' },
        screen: { name: 'login-password' },
        tenant: { enabledLocales: ['en', 'es'] },
        transaction: { 
          errors: [{ code: 'invalid_password', description: 'Invalid password', message: 'Invalid password provided' }], 
          state: 'active', 
          locale: 'en' 
        },
        untrustedData: { authorizationParams: { scope: 'openid profile' } }
      });

      expect(mockGetContext).toHaveBeenCalledWith('client');
      expect(mockGetContext).toHaveBeenCalledWith('organization');
      expect(mockGetContext).toHaveBeenCalledWith('prompt');
      expect(mockGetContext).toHaveBeenCalledWith('screen');
      expect(mockGetContext).toHaveBeenCalledWith('tenant');
      expect(mockGetContext).toHaveBeenCalledWith('transaction');
      expect(mockGetContext).toHaveBeenCalledWith('untrusted_data');
    });

    it('should return null values when contexts do not exist', () => {
      mockGetContext.mockReturnValue(undefined);

      const result = getCurrentScreenOptions();

      expect(result).toEqual({
        client: null,
        organization: null,
        prompt: null,
        screen: null,
        tenant: null,
        transaction: null,
        untrustedData: null
      });
    });

    it('should handle missing metadata fields gracefully', () => {
      const mockContexts: Record<string, any> = {
        client: { id: 'client123' }, // no metadata
        organization: { id: 'org456' }, // no metadata
        tenant: {}, // no enabled_locales
        transaction: { state: 'active', locale: 'en' }, // no errors
        untrusted_data: {} // no authorization_params
      };

      mockGetContext.mockImplementation((key: string) => mockContexts[key] || undefined);

      const result = getCurrentScreenOptions();

      expect(result).toEqual({
        client: { id: 'client123', metadata: null },
        organization: { id: 'org456', metadata: null },
        prompt: null,
        screen: null,
        tenant: { enabledLocales: [] },
        transaction: { errors: null, state: 'active', locale: 'en' },
        untrustedData: { authorizationParams: null }
      });
    });
  });

  describe('getCurrentThemeOptions', () => {
    let mockBranding: any;
    let mockThemeUtils: any;

    beforeEach(() => {
      // Access the mocked modules directly
      const brandingModule = jest.requireMock('../../../src/models/branding');
      const themeUtilsModule = jest.requireMock('../../../src/utils/theme-utils');
      
      mockBranding = brandingModule.Branding;
      mockThemeUtils = themeUtilsModule;
      
      // Reset all mocks
      jest.clearAllMocks();
    });

    it('should return null when branding context does not exist', () => {
      mockGetContext.mockReturnValue(undefined);

      const result = getCurrentThemeOptions();

      expect(mockGetContext).toHaveBeenCalledWith('branding');
      expect(result).toBeNull();
    });

    it('should return null when themes is null', () => {
      const mockBrandingContext = { settings: {}, themes: {} } as any;
      mockGetContext.mockReturnValue(mockBrandingContext);
      
      mockBranding.getSettings.mockReturnValue({});
      mockBranding.getThemes.mockReturnValue(null);

      const result = getCurrentThemeOptions();

      expect(result).toBeNull();
    });

    it('should return null when no default theme exists', () => {
      const mockBrandingContext = { settings: {}, themes: {} } as any;
      mockGetContext.mockReturnValue(mockBrandingContext);
      
      mockBranding.getSettings.mockReturnValue({});
      mockBranding.getThemes.mockReturnValue({ custom: {} }); // no default

      const result = getCurrentThemeOptions();

      expect(result).toBeNull();
    });

    it('should return flattened theme when branding and default theme exist', () => {
      const mockBrandingContext = { 
        settings: { colors: { primary: '#123456', pageBackground: '#ffffff' } }, 
        themes: { 
          default: {
            colors: { primary: '#000000' },
            fonts: { family: 'Arial' },
            borders: { radius: '4px' },
            pageBackground: { color: '#ffffff' },
            widget: { padding: '8px' }
          }
        }
      } as any;
      mockGetContext.mockReturnValue(mockBrandingContext);
      
      const mockSettings = { colors: { primary: '#123456', pageBackground: '#ffffff' } };
      const mockThemes = {
        default: {
          colors: { primary: '#000000' },
          fonts: { family: 'Arial' },
          borders: { radius: '4px' },
          pageBackground: { color: '#ffffff' },
          widget: { padding: '8px' }
        }
      };
      
      mockBranding.getSettings.mockReturnValue(mockSettings);
      mockBranding.getThemes.mockReturnValue(mockThemes);
      
      // Mock theme utility functions
      mockThemeUtils.flattenColors.mockReturnValue({ primary: '#123456' });
      mockThemeUtils.flattenFonts.mockReturnValue({ family: 'Arial' });
      mockThemeUtils.flattenBorders.mockReturnValue({ radius: '4px' });
      mockThemeUtils.flattenPageBackground.mockReturnValue({ background: '#ffffff' });
      mockThemeUtils.flattenWidget.mockReturnValue({ padding: '8px' });

      const result = getCurrentThemeOptions();

      expect(mockBranding.getSettings).toHaveBeenCalledWith(mockBrandingContext);
      expect(mockBranding.getThemes).toHaveBeenCalledWith(mockBrandingContext);
      expect(mockThemeUtils.flattenColors).toHaveBeenCalledWith(mockThemes.default.colors, mockSettings.colors);
      expect(mockThemeUtils.flattenFonts).toHaveBeenCalledWith(mockThemes.default.fonts);
      expect(mockThemeUtils.flattenBorders).toHaveBeenCalledWith(mockThemes.default.borders);
      expect(mockThemeUtils.flattenPageBackground).toHaveBeenCalledWith(mockThemes.default.pageBackground, mockSettings.colors.pageBackground);
      expect(mockThemeUtils.flattenWidget).toHaveBeenCalledWith(mockThemes.default.widget);
      
      expect(result).toEqual({
        colors: { primary: '#123456' },
        fonts: { family: 'Arial' },
        borders: { radius: '4px' },
        pageBackground: { background: '#ffffff' },
        widget: { padding: '8px' }
      });
    });
  });

  describe('getErrors', () => {
    it('should return transaction errors when they exist', () => {
      const mockErrors = [
        { code: 'invalid_password', description: 'Invalid password', message: 'Invalid password provided' },
        { code: 'too_many_attempts', description: 'Too many attempts', message: 'Too many login attempts' }
      ];
      const mockTransaction = { errors: mockErrors, state: 'error', locale: 'en' };
      mockGetContext.mockReturnValue(mockTransaction);

      const result = getErrors();

      expect(mockGetContext).toHaveBeenCalledWith('transaction');
      expect(result).toEqual(mockErrors);
    });

    it('should return null when transaction context does not exist', () => {
      mockGetContext.mockReturnValue(undefined);

      const result = getErrors();

      expect(mockGetContext).toHaveBeenCalledWith('transaction');
      expect(result).toBeNull();
    });

    it('should return null when transaction exists but has no errors', () => {
      const mockTransaction = { state: 'active', locale: 'en' };
      mockGetContext.mockReturnValue(mockTransaction);

      const result = getErrors();

      expect(mockGetContext).toHaveBeenCalledWith('transaction');
      expect(result).toBeNull();
    });

    it('should return null when transaction has undefined errors', () => {
      const mockTransaction = { errors: undefined, state: 'active', locale: 'en' };
      mockGetContext.mockReturnValue(mockTransaction);

      const result = getErrors();

      expect(result).toBeNull();
    });

    it('should return empty array when transaction has empty errors array', () => {
      const mockTransaction = { errors: [], state: 'active', locale: 'en' };
      mockGetContext.mockReturnValue(mockTransaction);

      const result = getErrors();

      expect(result).toEqual([]);
    });
  });
});