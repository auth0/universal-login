import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';
import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink, getBackLink } from '../../shared/screen';

export class ScreenOverride extends Screen implements OverrideOptions {
  signupLink: OverrideOptions['signupLink'];
  resetPasswordLink: OverrideOptions['resetPasswordLink'];
  backLink: OverrideOptions['backLink'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.signupLink = getSignupLink(screenContext);
    this.resetPasswordLink = getResetPasswordLink(screenContext);
    this.backLink = getBackLink(screenContext);
    this.data = Screen.getScreenData(screenContext) as OverrideOptions['data'];
  }  
}
