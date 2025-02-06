import { Branding } from '../../../src/models/branding';
import type { BrandingContext, BrandingMembers } from '../../../interfaces/models/branding';

describe('Branding', () => {
  let brandingContext: BrandingContext;
  let branding: Branding;

  beforeEach(() => {
    brandingContext = {
      settings: {
        colors: {
          primary: '#000000',
          page_background: {
            type: 'gradient',
            start: '#ffffff',
            end: '#000000',
            angle_deg: 45,
          },
        },
        favicon_url: 'https://example.com/favicon.ico',
        logo_url: 'https://example.com/logo.png',
        font: {
          url: 'https://example.com/font.woff2',
        },
      },
      themes: {
        default: {
          borders: { radius: '4px' },
          colors: { primary: '#ff0000' },
          displayName: 'Default Theme',
          fonts: { body: 'Arial' },
          page_background: { type: 'solid', color: '#f0f0f0' },
          widget: { borderRadius: '8px' },
        },
      },
    };

    branding = new Branding(brandingContext);
  });

  it('should initialize settings correctly', () => {
    expect(branding.settings).toEqual({
      colors: {
        primary: '#000000',
        pageBackground: {
          type: 'gradient',
          start: '#ffffff',
          end: '#000000',
          angleDegree: 45,
        },
      },
      faviconUrl: 'https://example.com/favicon.ico',
      logoUrl: 'https://example.com/logo.png',
      fontUrl: 'https://example.com/font.woff2',
    });
  });

  it('should initialize themes correctly', () => {
    expect(branding.themes).toEqual({
      default: {
        borders: { radius: '4px' },
        colors: { primary: '#ff0000' },
        displayName: 'Default Theme',
        fonts: { body: 'Arial' },
        pageBackground: { type: 'solid', color: '#f0f0f0' },
        widget: { borderRadius: '8px' },
      },
    });
  });

  describe('getSettings', () => {
    it('should return null if branding is undefined', () => {
      expect(Branding.getSettings(undefined)).toBeNull();
    });

    it('should return null if branding.settings is undefined', () => {
      expect(Branding.getSettings({} as BrandingContext)).toBeNull();
    });

    it('should correctly transform settings data', () => {
      expect(Branding.getSettings(brandingContext)).toEqual({
        colors: {
          primary: '#000000',
          pageBackground: {
            type: 'gradient',
            start: '#ffffff',
            end: '#000000',
            angleDegree: 45,
          },
        },
        faviconUrl: 'https://example.com/favicon.ico',
        logoUrl: 'https://example.com/logo.png',
        fontUrl: 'https://example.com/font.woff2',
      });
    });

    it('should return settings with only available properties', () => {
      const partialBrandingContext = {
        settings: {
          colors: {
            primary: '#123456',
          },
        },
      } as BrandingContext;

      expect(Branding.getSettings(partialBrandingContext)).toEqual({
        colors: {
          primary: '#123456',
        },
      });
    });
  });

  describe('getThemes', () => {
    it('should return null if branding is undefined', () => {
      expect(Branding.getThemes(undefined)).toBeNull();
    });

    it('should return null if branding.themes is undefined', () => {
      expect(Branding.getThemes({} as BrandingContext)).toBeNull();
    });

    it('should correctly transform themes data', () => {
      expect(Branding.getThemes(brandingContext)).toEqual({
        default: {
          borders: { radius: '4px' },
          colors: { primary: '#ff0000' },
          displayName: 'Default Theme',
          fonts: { body: 'Arial' },
          pageBackground: { type: 'solid', color: '#f0f0f0' },
          widget: { borderRadius: '8px' },
        },
      });
    });

    it('should return an empty object if default theme properties are missing', () => {
      const minimalBrandingContext = { themes: { default: {} } } as BrandingContext;
      expect(Branding.getThemes(minimalBrandingContext)).toEqual({
        default: {
          borders: {},
          colors: {},
          displayName: '',
          fonts: {},
          pageBackground: {},
          widget: {},
        },
      });
    });
  });
});
