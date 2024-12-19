import type { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';

export class Screen implements ScreenMembers {
  name: ScreenMembers['name'];
  captchaImage: ScreenMembers['captchaImage'];
  captchaSiteKey: ScreenMembers['captchaSiteKey'];
  captchaProvider: ScreenMembers['captchaProvider'];
  isCaptchaAvailable: ScreenMembers['isCaptchaAvailable'];
  data: ScreenMembers['data'];
  links: ScreenMembers['links'];
  texts: ScreenMembers['texts'];
  captcha: ScreenMembers['captcha'];

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

  static getScreenData(screen: ScreenContext): ScreenMembers['data'] {
    return (screen.data ?? null) as ScreenMembers['data'];
  }

  static getScreenLinks(screen: ScreenContext): ScreenMembers['links'] {
    return screen.links ?? null;
  }
}
