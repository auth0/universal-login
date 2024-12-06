import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPassword as OverrideOptions } from '../../../interfaces/screens/login-password';
import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getEditIdentifierLink } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  signupLink = getSignupLink(this.screen);
  resetPasswordLink = getResetPasswordLink(this.screen);
  editIdentifierLink = getEditIdentifierLink(this.screen);

  getScreenData = super.getScreenData.bind(this) as OverrideOptions['getScreenData'];
}
