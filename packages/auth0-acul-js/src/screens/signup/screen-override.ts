import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignupNew as OverrideOptions } from '../../../interfaces/screens/signup';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }
  static getScreenData = (screenContext: ScreenContext): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;
    return {
      ...data,
      name: data.name,
      loginLink: screenContext.links?.login,
    } as OverrideOptions['data'];
  };
}
