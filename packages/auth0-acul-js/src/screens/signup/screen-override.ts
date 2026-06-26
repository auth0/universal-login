import { Screen } from '../../models/screen';
import { getLoginLink, getGoogleOneTapConfig } from '../../shared/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignup as OverrideOptions } from '../../../interfaces/screens/signup';

export class ScreenOverride extends Screen implements OverrideOptions {
  loginLink: OverrideOptions['loginLink'];
  googleOneTapConfig: OverrideOptions['googleOneTapConfig'];

  constructor(screenContext: ScreenContext) {
    super(screenContext);
    this.loginLink = getLoginLink(screenContext);
    this.googleOneTapConfig = getGoogleOneTapConfig(screenContext);
  }
}
