import type { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';

export class Screen implements ScreenMembers {
  protected screen: ScreenContext;

  constructor(screen: ScreenContext) {
    this.screen = screen;
  }

  get name(): ScreenMembers['name'] {
    return this.screen.name;
  }

  get captchaImage(): ScreenMembers['captchaImage'] {
    return this.screen.captcha?.image ?? null;
  }

  get captchaSiteKey(): ScreenMembers['captchaSiteKey'] {
    return this.screen.captcha?.siteKey ?? null;
  }

  get captchaProvider(): ScreenMembers['captchaProvider'] {
    return this.screen.captcha?.provider ?? null;
  }

  get isCaptchaAvailable(): ScreenMembers['isCaptchaAvailable'] {
    return !!this.screen.captcha;
  }

  getScreenData(): ReturnType<ScreenMembers['getScreenData']> {
    return (this.screen.data ?? null) as ReturnType<ScreenMembers['getScreenData']>;
  }

  getScreenLinks(): ReturnType<ScreenMembers['getScreenLinks']> {
    return this.screen.links ?? null;
  }

  getScreenTexts(): ReturnType<ScreenMembers['getScreenTexts']> {
    return this.screen.texts ?? null;
  }

  getCaptchaConfig(): ReturnType<ScreenMembers['getCaptchaConfig']> {
    return this.screen.captcha ?? null;
  }
}
