import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getEditIdentifierLink } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPassword as OverrideOptions } from '../../../interfaces/screens/login-password';

export class ScreenOverride extends Screen implements OverrideOptions {
  signupLink: OverrideOptions['signupLink'];
  resetPasswordLink: OverrideOptions['resetPasswordLink'];
  editIdentifierLink: OverrideOptions['editIdentifierLink'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.signupLink = getSignupLink(screenContext);
    this.resetPasswordLink = getResetPasswordLink(screenContext);
    this.editIdentifierLink = getEditIdentifierLink(screenContext);
    this.data = ScreenOverride.getScreenData(screenContext);
  }

  static getScreenData(screenContext: ScreenContext): OverrideOptions['data'] {
    const data = screenContext.data;
    if (!data) return null;

    return {
      ...data,
      showSwitchToOtpButton: data?.show_switch_to_otp_button,
    } as OverrideOptions['data'];
  }
}
