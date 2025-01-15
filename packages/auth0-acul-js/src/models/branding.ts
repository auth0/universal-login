import type { BrandingContext, BrandingMembers } from '../../interfaces/models/branding';

export class Branding implements BrandingMembers {
  settings: BrandingMembers['settings'];
  themes: BrandingMembers['themes'];

  constructor(branding: BrandingContext | undefined) {
    this.settings = Branding.getSettings(branding);
    this.themes = Branding.getThemes(branding);
  }

  static getSettings(branding: BrandingContext | undefined): BrandingMembers['settings'] {
    if (!branding?.settings) return null;

    const { colors, favicon_url, logo_url, font } = branding.settings;

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
        },
      }),
      ...(typeof favicon_url === 'string' && favicon_url.length > 0 ? { faviconUrl: favicon_url } : {}),
      ...(typeof logo_url === 'string' && logo_url.length > 0 ? { logoUrl: logo_url } : {}),
      ...(typeof font?.url === 'string' && font.url.length > 0 ? { fontUrl: font.url } : {}),
    };
  }

  static getThemes(branding: BrandingContext | undefined): BrandingMembers['themes'] {
    if (!branding?.themes) return null;

    const { default: { borders = {}, colors = {}, displayName = '', fonts = {}, page_background: pageBackground = {}, widget = {} } = {} } =
      branding.themes;

    return {
      default: {
        borders,
        colors,
        displayName,
        fonts,
        pageBackground,
        widget,
      },
    };
  }
}
