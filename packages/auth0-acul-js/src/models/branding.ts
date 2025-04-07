import type { BrandingContext, BrandingMembers } from '../../interfaces/models/branding';

/**
 * @class Branding
 * @description Provides access to the tenant's branding settings, including colors, logos, and themes.
 * @implements {BrandingMembers}
 */
export class Branding implements BrandingMembers {
  /** @property {BrandingSettings | null} settings - Branding settings like colors, logo URLs, etc. */
  settings: BrandingMembers['settings'];
  
  /** @property {BrandingThemes | null} themes - Branding themes defining the visual appearance */
  themes: BrandingMembers['themes'];

  /**
   * @constructor
   * @param {BrandingContext | undefined} branding - The branding context from Universal Login
   */
  constructor(branding: BrandingContext | undefined) {
    this.settings = Branding.getSettings(branding);
    this.themes = Branding.getThemes(branding);
  }

  /**
   * @static
   * @method getSettings
   * @description Extracts and transforms branding settings from the context
   * @param {BrandingContext | undefined} branding - The branding context
   * @returns {BrandingSettings | null} Structured branding settings or null if unavailable
   */
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
                  angleDegree: colors.page_background.angle_deg,
                },
        },
      }),
      ...(typeof favicon_url === 'string' && favicon_url.length > 0 ? { faviconUrl: favicon_url } : {}),
      ...(typeof logo_url === 'string' && logo_url.length > 0 ? { logoUrl: logo_url } : {}),
      ...(typeof font?.url === 'string' && font.url.length > 0 ? { fontUrl: font.url } : {}),
    };
  }

  /**
   * @static
   * @method getThemes
   * @description Extracts and transforms branding themes from the context
   * @param {BrandingContext | undefined} branding - The branding context
   * @returns {BrandingThemes | null} Structured branding themes or null if unavailable
   */
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
