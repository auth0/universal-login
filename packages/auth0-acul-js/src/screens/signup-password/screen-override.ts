import { Screen } from '../../models/screen';
import { getLoginLink, getEditIdentifierLink } from '../../shared/screen';

import type { ScreenContextOnSignupPassword, ScreenMembersOnSignupPassword as OverrideOptions } from '../../../interfaces/screens/signup-password';

export class ScreenOverride extends Screen implements OverrideOptions {
  loginLink: OverrideOptions['loginLink'];
  editLink: OverrideOptions['editLink'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContextOnSignupPassword) {
    super(screenContext);
    this.loginLink = getLoginLink(screenContext);
    this.editLink = getEditIdentifierLink(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  static getScreenData = (screenContext: ScreenContextOnSignupPassword): OverrideOptions['data'] => {
    const data = screenContext.data;
    if (!data) return null;
    return {
      email: data.email,
      phoneNumber: data.phone_number,
      username: data.username,
    } as OverrideOptions['data'];
  };
}
