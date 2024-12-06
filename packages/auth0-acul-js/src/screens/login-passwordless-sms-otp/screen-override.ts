import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';
import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getBackLink } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  constructor(screenContext: ScreenContext) {
    super(screenContext);
  }

  signupLink = getSignupLink(this.screen);
  resetPasswordLink = getResetPasswordLink(this.screen);
  backLink = getBackLink(this.screen);
  getScreenData = super.getScreenData.bind(this) as OverrideOptions['getScreenData'];
}
