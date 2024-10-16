import { ScreenContext, ScreenMembers } from '../interfaces/models/screen';
 
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

  // TODO: TBD
  // get formActions(): ScreenMembers['formActions'] {
  //   return this.screen?.form_actions;
  // }

  get captcha(): ScreenMembers['captcha'] {
    return this.screen?.captcha;
  }
}