import type { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';

export class Screen implements ScreenMembers {
  private screen: ScreenContext;

  constructor(screen: ScreenContext) {
    this.screen = screen;
  }

  get name(): ScreenMembers['name'] {
    return this.screen?.name;
  }

  get links(): ScreenMembers['links'] {
    return this.screen?.links;
  }

  get texts(): ScreenMembers['texts'] {
    return this.screen?.texts;
  }

  get hasCaptcha(): ScreenMembers['hasCaptcha'] {
    return !!this.screen?.captcha;
  }

  get captchaImage(): ScreenMembers['captchaImage'] {
    return this.screen.captcha?.image;
  }

  get captchaSiteKey(): ScreenMembers['captchaSiteKey'] {
    return this.screen.captcha?.siteKey;
  }

  get captchaProvider(): ScreenMembers['captchaProvider'] {
    return this.screen.captcha?.provider;
  }

  get data(): ScreenMembers['data'] {
    return this.screen.data;
  }

  // TODO: TBD
  // get formActions(): ScreenMembers['formActions'] {
  //   return this.screen?.form_actions;
  // }

  get captcha(): ScreenMembers['captcha'] {
    return this.screen?.captcha as Record<string, unknown> | undefined;
  }

  get passkey(): ScreenMembers['passkey'] {
    return this.screen?.data as ScreenMembers['passkey'];
  }
}
