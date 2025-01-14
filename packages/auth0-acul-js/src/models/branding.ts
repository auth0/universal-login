import type { BrandingContext, BrandingMembers } from '../../interfaces/models/branding';

export class Branding implements BrandingMembers {
  settings:  BrandingMembers['settings'];
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
      ...(favicon_url ? { faviconUrl: favicon_url } : {}),
      ...(logo_url ? { logoUrl: logo_url } : {}),
      ...(font ? { fontUrl: font.url } : {}),
    };
  }

  static getThemes(branding: BrandingContext | undefined): BrandingMembers['themes'] {
    if (!branding || !branding?.themes) return null;

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
