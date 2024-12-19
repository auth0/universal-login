import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPasswordlessEmailCode as OverrideOptions } from '../../../interfaces/screens/login-passwordless-email-code';
import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getEditIdentifierLink } from '../../shared/screen';

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
    this.data = Screen.getScreenData(screenContext) as OverrideOptions['data'];
  }
}
