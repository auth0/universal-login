import { Screen } from '../../models/screen';
import { getSignupLink, getResetPasswordLink } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';

/**
 * Login screen override implementation
 */
export class ScreenOverride extends Screen implements OverrideOptions {
  signupLink: OverrideOptions['signupLink'];
  resetPasswordLink: OverrideOptions['resetPasswordLink'];
  data: OverrideOptions['data'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.signupLink = getSignupLink(screenContext);
    this.resetPasswordLink = getResetPasswordLink(screenContext);
    this.data = Screen.getScreenData(screenContext) as OverrideOptions['data'];
  }
}
