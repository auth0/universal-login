import type { BrandingContext, BrandingMembers, BrandingSettings, BrandingThemes } from '../../interfaces/models/branding';

export class Branding implements BrandingMembers {
  private branding: BrandingContext | undefined;

  constructor(client: BrandingContext | undefined) {
    this.branding = client;
  }

  get hasThemes() {
    return !!this.branding?.themes;
  }

  get hasSettings() {
    return !!this.branding?.settings;
  }

  getSettings(): BrandingSettings {
    if (!this.branding || !this.branding?.settings) return null;
  
    const { colors, favicon_url, logo_url, font } = this.branding.settings;
    return {
      ...(colors && {
        colors: {
          primary: colors.primary,
          pageBackground:
            typeof colors.page_background === 'string'
              ? colors.page_background
              : colors.page_background && {
                  type: colors.page_background.type,
                  start: colors.page_background.start,
                  end: colors.page_background.end,
                  angleDeg: colors.page_background.angle_deg,
                },
        }
      }),
      ...(favicon_url && { faviconUrl: favicon_url }),
      ...(logo_url && { logoUrl: logo_url }),
      ...(font && { font: { url: font.url } }),
    };
  }

  getThemes(): BrandingThemes {
    if (!this.branding || !this.branding?.themes) return null;
  
    const {
      default: {
        borders = {},
        colors = {},
        displayName = '',
        fonts = {},
        page_background: pageBackground = {},
        widget = {},
      } = {}
    } = this.branding.themes;
  
    return {
      default: {
        borders,
        colors,
        displayName,
        fonts,
        pageBackground,
        widget,
      }
    };
  }
}
