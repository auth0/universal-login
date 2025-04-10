import type { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';

/**
 * @class Screen
 * @description Provides access to the current screen's configuration, including captcha settings, data, links, and text content.
 * @implements {ScreenMembers}
 */
export class Screen implements ScreenMembers {
  /** @property {string} name - The name of the current screen */
  name: ScreenMembers['name'];

  /** @property {string | null} captchaImage - URL to the captcha image if available */
  captchaImage: ScreenMembers['captchaImage'];

  /** @property {string | null} captchaSiteKey - The site key for captcha integration */
  captchaSiteKey: ScreenMembers['captchaSiteKey'];

  /** @property {string | null} captchaProvider - The provider of the captcha service */
  captchaProvider: ScreenMembers['captchaProvider'];

  /** @property {boolean} isCaptchaAvailable - Indicates if captcha is available on this screen */
  isCaptchaAvailable: ScreenMembers['isCaptchaAvailable'];

  /** @property {Record<string, any> | null} data - Screen-specific data for rendering or logic */
  data: ScreenMembers['data'];

  /** @property {Record<string, string> | null} links - Navigation links available on this screen */
  links: ScreenMembers['links'];

  /** @property {Record<string, string> | null} texts - Text content for UI elements */
  texts: ScreenMembers['texts'];

  /** @property {CaptchaContext | null} captcha - Complete captcha configuration */
  captcha: ScreenMembers['captcha'];

  /**
   * @constructor
   * @param {ScreenContext} screen - The screen context from Universal Login
   */
  constructor(screen: ScreenContext) {
    this.name = screen.name;
    this.captchaImage = screen.captcha?.image ?? null;
    this.captchaSiteKey = screen.captcha?.siteKey ?? null;
    this.captchaProvider = screen.captcha?.provider ?? null;
    this.isCaptchaAvailable = !!screen.captcha;
    this.texts = screen.texts ?? null;
    this.captcha = screen.captcha ?? null;
    this.data = Screen.getScreenData(screen);
    this.links = Screen.getScreenLinks(screen);
  }

  /**
   * @static
   * @method getScreenData
   * @description Extracts screen data from the context
   * @param {ScreenContext} screen - The screen context from Universal Login
   * @returns {Record<string, any> | null} Screen data or null if unavailable
   */
  static getScreenData(screen: ScreenContext): ScreenMembers['data'] {
    return (screen.data ?? null) as ScreenMembers['data'];
  }

  /**
   * @static
   * @method getScreenLinks
   * @description Extracts navigation links from the context
   * @param {ScreenContext} screen - The screen context from Universal Login
   * @returns {Record<string, string> | null} Screen links or null if unavailable
   */
  static getScreenLinks(screen: ScreenContext): ScreenMembers['links'] {
    return screen.links ?? null;
  }
}
